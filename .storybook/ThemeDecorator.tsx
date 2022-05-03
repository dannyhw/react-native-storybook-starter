import {ThemeProvider} from '@shopify/restyle';
import { useDarkMode } from 'storybook-dark-mode';
import {lightTheme, darkTheme} from './../design-system/theme';

const  ThemeWrapper = (props) => (
    <ThemeProvider theme={useDarkMode() ? darkTheme : lightTheme}>
      {props.children}
    </ThemeProvider>
  );


const ThemeDecorator = (storyFn: any) => (
    <ThemeWrapper>
        {storyFn()}
    </ThemeWrapper>
  );
  
export default ThemeDecorator;