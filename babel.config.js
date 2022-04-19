module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js'],
        alias: {
          '@components': './components',
          '@styles': './styles',
        },
      },
    ],
  ],
};
