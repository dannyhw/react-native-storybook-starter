import { StyleSheet, Text, View } from 'react-native';
import StorybookUIRoot from './.rnstorybook';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// @ts-ignore add process.env to global types to avoid type error
const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

export default function App() {
  if (isStorybookEnabled) {
    return <StorybookUIRoot />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
