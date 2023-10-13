import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { PRContainer, RNText } from '../../Common';
import { NavigationRoutes, Strings } from '../../Constants';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Colors, hp, wp } from '../../Theme';
import Firestore from './Firestore';

const Stack = createStackNavigator();

const Firebase = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Firebase Videos'} component={InnerScreens} />
      <Stack.Screen
        name={NavigationRoutes.FirebaseFirestore}
        component={Firestore}
      />
    </Stack.Navigator>
  );
};

const InnerScreens = ({ navigation }) => {
  const RenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.navigate)}
        style={styles.renderScreens}>
        <RNText>{item.title}</RNText>
      </TouchableOpacity>
    );
  };

  return (
    <PRContainer HeaderTitle={Strings.Firebase}>
      <FlatList
        data={DATA}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={RenderItem}
      />
    </PRContainer>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: hp(2),
  },
  renderScreens: {
    borderWidth: 1,
    borderColor: Colors.ACACAC,
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
});

const screenOptions = {
  headerShown: false,
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
};

const DATA = [
  {
    title: Strings.FirebaseFirestore,
    navigate: NavigationRoutes.FirebaseFirestore,
  },
];

export default Firebase;
