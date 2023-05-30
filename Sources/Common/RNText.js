import React from 'react';
import { Text } from 'react-native';
import { Colors, FontFamily, FontSize } from '../Theme';
const RNText = ({
  children,
  style,
  numOfLines,
  size,
  family,
  weight,
  align,
  color,
  pTop,
  pBottom,
  pLeft,
  pRight,
  pHorizontal,
  pVertical,
  spacing,
  onPress,
}) => {
  const TextStyles = {
    color: color ?? Colors.Black,
    fontSize: size ?? FontSize.font16,
    fontFamily: family ?? FontFamily.OpenSans_Regular,
    fontWeight: weight,
    textAlign: align ?? 'left',
    paddingTop: pTop,
    paddingLeft: pLeft,
    paddingRight: pRight,
    paddingBottom: pBottom,
    paddingHorizontal: pHorizontal,
    paddingVertical: pVertical,
    letterSpacing: spacing,
  };
  return (
    <Text
      onPress={onPress}
      numberOfLines={numOfLines}
      style={[TextStyles, style]}>
      {children}
    </Text>
  );
};
export default RNText;
