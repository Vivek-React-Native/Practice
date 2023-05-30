import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, hp } from '../Theme';
const RNPagginationLoader = ({ size, color }) => {
  return (
    <View style={styles.Box}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || Colors.N726E3E}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Box: {
    backgroundColor: Colors.White,
    paddingVertical: hp(2),
  },
});
export default RNPagginationLoader;
