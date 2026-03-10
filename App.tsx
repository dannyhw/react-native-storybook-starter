import StorybookUIRoot from './.rnstorybook';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/Home';
import { DevSettings } from 'react-native';

// @ts-ignore add process.env to global types to avoid type error
const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

const RootStack = createNativeStackNavigator({
  initialRouteName: isStorybookEnabled ? 'Storybook' : 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: true,
      },
    },
    ...(isStorybookEnabled
      ? {
          Storybook: {
            screen: StorybookUIRoot,
            options: {
              headerShown: false,
            },
          },
        }
      : {}),
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation
      ref={ref => {
        if (isStorybookEnabled && __DEV__) {
          DevSettings.addMenuItem('go to storybook', () => {
            ref?.navigate('Storybook');
          });
          DevSettings.addMenuItem('go to home', () => {
            ref?.navigate('Home');
          });
        }
      }}
      linking={{
        enabled: 'auto',
        prefixes: ['rnstorybook-starter://'],
      }}
    />
  );
}
