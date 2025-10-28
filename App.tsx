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

export default function App() {
  if (process.env.STORYBOOK_ENABLED) {
    return <StorybookUIRoot />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
