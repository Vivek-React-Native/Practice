import React from 'react';
import { View } from 'react-native';
import RNHeader from './RNHeader';
import RNStyles from './RNStyles';
import RNLoader from './RNLoader';

const PRContainer = ({ children, HeaderTitle, ContainerStyle, IsLoading }) => {
  return (
    <View style={RNStyles.container}>
      <RNHeader title={HeaderTitle} />
      <RNLoader visible={IsLoading} />
      <View style={ContainerStyle ?? RNStyles.container}>{children}</View>
    </View>
  );
};

export default PRContainer;
