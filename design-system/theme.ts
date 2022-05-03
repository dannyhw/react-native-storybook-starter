import {createTheme} from '@shopify/restyle';

const theme = createTheme({
    colors: {
        background: '#fff',
        red:'#FB4901',
        green:'#1EA849',
        purple:'#7B61FF',
        blue:'#42A0F6',
      },
      spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
      },
      breakpoints: {
        narrow: {height: 0, width: 0},
        short: {height: 0, width: 360},
        tall: {height: 667, width: 360},
        wide: {height: 667, width: 412},
      },
      textVariants: {
        defaults: {  },
      },
    });
    
    export type Theme = typeof theme;
    export default theme;