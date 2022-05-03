import {ThemeProvider} from '@shopify/restyle';
import theme from './../design-system/theme';

const ThemeDecorator = (storyFn: any) => (
    <ThemeProvider theme={theme}>
        {storyFn()}
    </ThemeProvider>
  );
  
export default ThemeDecorator;