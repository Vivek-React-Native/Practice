import React from 'react';
import { View } from 'react-native';
import RNHeader from './RNHeader';
import RNStyles from './RNStyles';

const PRContainer = ({ children, HeaderTitle, ContainerStyle }) => {
  return (
    <View style={RNStyles.container}>
      <RNHeader title={HeaderTitle} />
      <View style={ContainerStyle ?? RNStyles.container}>{children}</View>
    </View>
  );
};

export default PRContainer;
