A starter project with react native 0.75.3, @storybook/react-native 8, storybook/addon-react-native-web

![picture of storybook](https://github.com/user-attachments/assets/cf98766d-8b90-44ab-b718-94ab16e63205)

# getting started

To get all the dependencies run

```
yarn install
```

To run on the web with addon-react-native-web use:

```
yarn storybook:web
```

To run storybook on ios or android using metro (this starts the metro server with storybook enabled)

```
yarn storybook
```

then to build for ios or android in another terminal run

```
yarn storybook:ios
```

or

```
yarn storybook:android
```

To update the stories one time, this happens once automatically when metro starts and withStorybook is enabled.

```
yarn storybook-generate
```
