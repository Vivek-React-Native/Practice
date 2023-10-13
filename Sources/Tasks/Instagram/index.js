import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PRContainer, RNButton, RNStyles } from '../../Common';

const InstagramLogin = () => {
  return (
    <PRContainer
      HeaderTitle={'Instagram Login'}
      ContainerStyle={styles.container}></PRContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.center,
    ...RNStyles.container,
  },
});

export default InstagramLogin;
