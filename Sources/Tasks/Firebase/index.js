import React from 'react';
import { StyleSheet } from 'react-native';
import { PRContainer } from '../../Common';
import { NavigationRoutes, Strings } from '../../Constants';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Firebase = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Firebase Videos'} component={InnerScreens} />
    </Stack.Navigator>
  );
};

const InnerScreens = () => {
  return <PRContainer HeaderTitle={Strings.Firebase}></PRContainer>;
};

const DATA = [
  {
    title: Strings.FirebaseAnalytics,
    navigate: NavigationRoutes.FirebaseAnalytics,
  },
];

const styles = StyleSheet.create({});

export default Firebase;
