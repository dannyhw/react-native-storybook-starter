import {createTheme} from '@shopify/restyle';


const breakpoints = {
  narrow: {height: 0, width: 0},
  short: {height: 0, width: 360},
  tall: {height: 667, width: 360},
  wide: {height: 667, width: 412},
}

const spacing ={
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
}

const textVariants = {
  defaults: {  
    color:'text'
  },
}

export const lightTheme = createTheme({  
      spacing,
      breakpoints,
      textVariants,
      colors: {
        text: '#000',
        red:'#CC4A49',
        green:'#4C9468',
        purple:'#7B4DB6',
        blue:'#529FF4',
      },
    }
  );
  
  export const darkTheme: Theme = {
    ...lightTheme,
    colors: {
      text: '#fff',
      red:'#E1605F',
      green:'#5FAE7D',
      purple:'#B481E9',
      blue:'#66A9F4',
    },
  };

  export type Theme = typeof lightTheme;
  export default lightTheme;
