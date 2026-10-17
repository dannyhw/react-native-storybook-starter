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
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
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

  const append = useCallback(
    (line: string) => setLog(prev => [...prev.slice(-7), line]),
    [],
  );

  // The container counts keypresses that bubble up from the input.
  useEffect(() => {
    const container = containerRef.current as EventTargetLike | null;
    const onKeyPress = () => setBubbled(count => count + 1);
    container?.addEventListener?.('keypress', onKeyPress);
    return () => container?.removeEventListener?.('keypress', onKeyPress);
  }, []);

  const onKeyPress = (event: TextInputKeyPressEvent) => {
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
      input.dispatchEvent(createKeyPressEvent(key));
      await wait(delayMs);
    }
    setTyping(false);
  };

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
        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={() => {
            setValue('');
            setLog([]);
            setBubbled(0);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.status}>
        value: "{value}" · keypresses bubbled to container: {bubbled}
      </Text>

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
  logLine: {
    fontFamily: 'Menlo',
    fontSize: 12,
  },
});
