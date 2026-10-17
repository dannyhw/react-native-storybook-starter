import {
  type ComponentRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputKeyPressEvent,
  View,
} from 'react-native';

// RN 0.88 installs a W3C `Event` global, but the TS config has no DOM lib.
type EventInstance = { type: string; eventPhase: number };
type EventConstructor = new (
  type: string,
  init?: { bubbles?: boolean; cancelable?: boolean },
) => EventInstance;

// `dispatchEvent` only exists on native refs at the Canary release level.
type EventTargetLike = {
  dispatchEvent?: (event: EventInstance) => boolean;
  addEventListener?: (
    type: string,
    listener: (event: EventInstance) => void,
  ) => void;
  removeEventListener?: (
    type: string,
    listener: (event: EventInstance) => void,
  ) => void;
};

type KeyPressNativeEvent = TextInputKeyPressEvent['nativeEvent'] & {
  dispatched?: true;
};

// Builds a `keypress` event shaped like the one native sends, so the
// TextInput's `onKeyPress` prop can read `event.nativeEvent.key`.
function createKeyPressEvent(key: string): EventInstance {
  const BaseEvent = (globalThis as unknown as { Event: EventConstructor })
    .Event;
  const event = new BaseEvent('keypress', { bubbles: true });
  const nativeEvent = { key, dispatched: true };
  return Object.assign(event, { nativeEvent });
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Lets a story `play` function drive the mounted story, since play functions
// on React Native get no canvas element to query.
export type TypingEventsHandle = {
  typeText: (text: string) => Promise<void>;
  reset: () => void;
  getInputText: () => string;
  setPlayStatus: (status: string) => void;
};

export const typingEventsHandle: { current: TypingEventsHandle | null } = {
  current: null,
};

export type TypingEventsProps = {
  text: string;
  delayMs: number;
};

export const TypingEvents = ({ text, delayMs }: TypingEventsProps) => {
  const containerRef = useRef<ComponentRef<typeof View>>(null);
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [bubbled, setBubbled] = useState(0);
  const [assertions, setAssertions] = useState({ passed: 0, failed: 0 });
  const [playStatus, setPlayStatus] = useState<string | null>(null);
  // The text the TextInput is rendered with, readable outside React.
  const valueRef = useRef(value);
  valueRef.current = value;
  // Events seen by the `onKeyPress` prop and by the container listener, so each
  // dispatch can assert that its own event object reached both.
  const handledByProp = useRef(new WeakSet<object>());
  const handledByContainer = useRef(new WeakSet<object>());

  const append = useCallback(
    (line: string) => setLog(prev => [...prev.slice(-7), line]),
    [],
  );

  // The container counts keypresses that bubble up from the input.
  useEffect(() => {
    const container = containerRef.current as EventTargetLike | null;
    const onKeyPress = (event: EventInstance) => {
      handledByContainer.current.add(event);
      setBubbled(count => count + 1);
    };
    container?.addEventListener?.('keypress', onKeyPress);
    return () => container?.removeEventListener?.('keypress', onKeyPress);
  }, []);

  const onKeyPress = (event: TextInputKeyPressEvent) => {
    handledByProp.current.add(event);
    const { key, dispatched } = event.nativeEvent as KeyPressNativeEvent;
    append(`${dispatched ? 'dispatched' : 'native'} keypress "${key}"`);
    // Real typing also sends `change`, which `onChangeText` handles.
    if (!dispatched) {
      return;
    }
    setValue(prev => (key === 'Backspace' ? prev.slice(0, -1) : prev + key));
  };

  const dispatchKeys = async (keys: string[]) => {
    const input = inputRef.current as EventTargetLike | null;
    if (!input?.dispatchEvent) {
      append('dispatchEvent is not available (needs Canary)');
      return;
    }
    setTyping(true);
    for (const key of keys) {
      const event = createKeyPressEvent(key);
      input.dispatchEvent(event);
      // Dispatch is synchronous, so both handlers must have run by now.
      const failures = [
        !handledByProp.current.has(event) && 'onKeyPress prop',
        !handledByContainer.current.has(event) && 'container listener',
      ].filter(Boolean);
      if (failures.length === 0) {
        setAssertions(prev => ({ ...prev, passed: prev.passed + 1 }));
      } else {
        setAssertions(prev => ({ ...prev, failed: prev.failed + 1 }));
        append(`✗ "${key}" not handled by ${failures.join(' or ')}`);
        console.error(
          `keypress "${key}" was not handled by ${failures.join(' or ')}`,
        );
      }
      await wait(delayMs);
    }
    setTyping(false);
  };

  const reset = useCallback(() => {
    setValue('');
    setLog([]);
    setBubbled(0);
    setAssertions({ passed: 0, failed: 0 });
    setPlayStatus(null);
  }, []);

  // The handle is registered once, so it reaches the latest `dispatchKeys`
  // (and through it the latest `delayMs`) via a ref.
  const dispatchKeysRef = useRef(dispatchKeys);
  dispatchKeysRef.current = dispatchKeys;

  useEffect(() => {
    typingEventsHandle.current = {
      typeText: textToType => dispatchKeysRef.current([...textToType]),
      reset,
      getInputText: () => valueRef.current,
      setPlayStatus,
    };
    return () => {
      typingEventsHandle.current = null;
    };
  }, [reset]);

  return (
    <View ref={containerRef} style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onKeyPress={onKeyPress}
        placeholder="Dispatched keypresses type here"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <View style={styles.row}>
        <Pressable
          style={[styles.button, typing && styles.disabled]}
          disabled={typing}
          onPress={() => dispatchKeys([...text])}
        >
          <Text style={styles.buttonText}>Type "{text}"</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.secondary, typing && styles.disabled]}
          disabled={typing}
          onPress={() => dispatchKeys(['Backspace'])}
        >
          <Text style={styles.buttonText}>Backspace</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.status}>
        value: "{value}" · keypresses bubbled to container: {bubbled}
      </Text>

      <Text
        testID="typing-assertions"
        style={[
          styles.status,
          assertions.failed > 0 ? styles.fail : styles.pass,
        ]}
      >
        {assertions.failed > 0 ? '✗' : '✓'} assertions: {assertions.passed}{' '}
        passed, {assertions.failed} failed
      </Text>

      {playStatus != null && (
        <Text
          testID="typing-play-status"
          style={[
            styles.status,
            playStatus.startsWith('✗') ? styles.fail : styles.pass,
          ]}
        >
          play: {playStatus}
        </Text>
      )}

      <View>
        {log.map((line, index) => (
          <Text key={index} style={styles.logLine}>
            {line}
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
  input: {
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  secondary: {
    backgroundColor: '#6b7280',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  status: {
    fontWeight: '600',
  },
  pass: {
    color: '#15803d',
  },
  fail: {
    color: '#b91c1c',
  },
  logLine: {
    fontFamily: 'Menlo',
    fontSize: 12,
  },
});
