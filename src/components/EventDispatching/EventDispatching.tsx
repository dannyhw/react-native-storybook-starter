import {
  type ComponentRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// The EventTarget methods only exist on native refs at the Canary release level,
// and aren't in the public View types yet.
type EventTargetLike = {
  addEventListener?: (
    type: string,
    listener: (event: DispatchedEvent) => void,
    options?: boolean | { capture?: boolean },
  ) => void;
  removeEventListener?: (
    type: string,
    listener: (event: DispatchedEvent) => void,
    options?: boolean | { capture?: boolean },
  ) => void;
};

type DispatchedEvent = {
  type: string;
  eventPhase: number;
  stopPropagation: () => void;
};

const PHASES = ['none', 'capture', 'target', 'bubble'];

export type EventDispatchingProps = {
  eventType: string;
  stopAtTarget: boolean;
};

export const EventDispatching = ({
  eventType,
  stopAtTarget,
}: EventDispatchingProps) => {
  const outerRef = useRef<ComponentRef<typeof View>>(null);
  const innerRef = useRef<ComponentRef<typeof View>>(null);
  const [log, setLog] = useState<string[]>([]);
  const [supported, setSupported] = useState<boolean | null>(null);

  const append = useCallback(
    (line: string) => setLog(prev => [...prev, line]),
    [],
  );

  useEffect(() => {
    const outerNode = outerRef.current as EventTargetLike | null;
    const innerNode = innerRef.current as EventTargetLike | null;
    setSupported(typeof outerNode?.addEventListener === 'function');
    if (!outerNode?.addEventListener || !innerNode?.addEventListener) {
      return;
    }

    const describe = (node: string) => (event: DispatchedEvent) =>
      append(`${node} listener (${PHASES[event.eventPhase]})`);

    const onOuterCapture = describe('outer capture');
    const onOuterBubble = describe('outer bubble');
    const onInner = (event: DispatchedEvent) => {
      describe('inner')(event);
      if (stopAtTarget) {
        event.stopPropagation();
      }
    };

    outerNode.addEventListener(eventType, onOuterCapture, { capture: true });
    outerNode.addEventListener(eventType, onOuterBubble);
    innerNode.addEventListener(eventType, onInner);

    return () => {
      outerNode.removeEventListener?.(eventType, onOuterCapture, {
        capture: true,
      });
      outerNode.removeEventListener?.(eventType, onOuterBubble);
      innerNode.removeEventListener?.(eventType, onInner);
    };
  }, [append, eventType, stopAtTarget]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Imperative EventTarget API:{' '}
        {supported === null
          ? 'checking…'
          : supported
            ? 'available'
            : 'not available (needs Canary)'}
      </Text>

      <View ref={outerRef} style={styles.outer}>
        <Text style={styles.label}>outer</Text>
        {/* Native only emits pointer and click events for views with a matching
            prop, so the inner view keeps declarative handlers too. The prop
            runs before imperative listeners on the same node. */}
        <View
          ref={innerRef}
          style={styles.inner}
          onClick={() => append('inner onClick prop')}
          onPointerDown={() => append('inner onPointerDown prop')}
          onPointerUp={() => append('inner onPointerUp prop')}
          onTouchStart={() => append('inner onTouchStart prop')}
          onTouchEnd={() => append('inner onTouchEnd prop')}
        >
          <Text style={styles.label}>inner: tap me</Text>
        </View>
      </View>

      <Pressable style={styles.clear} onPress={() => setLog([])}>
        <Text style={styles.clearText}>Clear log</Text>
      </Pressable>

      <View style={styles.log}>
        {log.map((line, index) => (
          <Text key={index} style={styles.logLine}>
            {index + 1}. {line}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  status: {
    fontWeight: 'bold',
  },
  outer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    gap: 8,
  },
  inner: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
  },
  label: {
    fontWeight: '600',
  },
  clear: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  clearText: {
    fontWeight: '600',
  },
  log: {
    gap: 2,
  },
  logLine: {
    fontFamily: 'Menlo',
    fontSize: 12,
  },
});
