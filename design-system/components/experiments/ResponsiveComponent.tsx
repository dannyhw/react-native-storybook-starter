import React from 'react';
import {Text as RnText} from 'react-native';
import {
    ColorProps,
    createBox,
    createText,
    useResponsiveProp,
    useTheme,
    ResponsiveValue,
  } from '@shopify/restyle';
  import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableOpacityProps,
  } from 'react-native';
  import Theme from './../../theme';
const Text = createText<Theme>();
const Box = createBox<Theme>();
type Props = React.ComponentProps<typeof Box> &
  ColorProps<Theme>;
export const ResponsiveComponent = ({
  color = {
    narrow: 'red',
    short: 'green',
    tall: 'purple',
    wide: 'blue'
  },
  ...props
}: Props) => {
  const theme = useTheme<Theme>();
  const textColorProp = useResponsiveProp(color)
  const bpByColor = {
    'red':'narrow',
    'green':'short',
    'purple':'tall',
    'blue':'wide'
  }
 

  return (
    <Box flexDirection="row"  {...props}>
      <Text color={color}>
        This is {textColorProp} because the viewport is {bpByColor[textColorProp]} 
      </Text>
      
    </Box>
  );
};
