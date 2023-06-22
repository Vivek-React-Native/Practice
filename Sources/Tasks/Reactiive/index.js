import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNHeader, RNStyles, RNText } from '../../Common';
import { NavigationRoutes, Strings } from '../../Constants';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Colors, hp, wp } from '../../Theme';
import Reactiive_Episode_1 from './Reactiive_Episode_1';
import Reactiive_Episode_2 from './Reactiive_Episode_2';
import Reactiive_Episode_3 from './Reactiive_Episode_3';
import Reactiive_Episode_4 from './Reactiive_Episode_4';
import RandomAnimation from './RandomAnimation';

const Stack = createStackNavigator();

const Reactiive = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Reactiive Reanimated'} component={InnerScreens} />
      <Stack.Screen
        name={NavigationRoutes.Reactiive_Episode_1}
        component={Reactiive_Episode_1}
      />
      <Stack.Screen
        name={NavigationRoutes.Reactiive_Episode_2}
        component={Reactiive_Episode_2}
      />
      <Stack.Screen
        name={NavigationRoutes.Reactiive_Episode_3}
        component={Reactiive_Episode_3}
      />
      <Stack.Screen
        name={NavigationRoutes.Reactiive_Episode_4}
        component={Reactiive_Episode_4}
      />
      <Stack.Screen
        name={NavigationRoutes.RandomAnimation}
        component={RandomAnimation}
      />
    </Stack.Navigator>
  );
};

const InnerScreens = ({ navigation }) => {
  const RenderScreens = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.navigate)}
        style={styles.renderScreens}>
        <RNText>{item.title}</RNText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.Reactiive} />
      <FlatList
        data={DATA}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        renderItem={RenderScreens}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
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
    title: Strings.Reactiive_Episode_1,
    navigate: NavigationRoutes.Reactiive_Episode_1,
  },
  {
    title: Strings.Reactiive_Episode_2,
    navigate: NavigationRoutes.Reactiive_Episode_2,
  },
  {
    title: Strings.Reactiive_Episode_3,
    navigate: NavigationRoutes.Reactiive_Episode_3,
  },
  {
    title: Strings.Reactiive_Episode_4,
    navigate: NavigationRoutes.Reactiive_Episode_4,
  },
  {
    title: Strings.RandomAnimation,
    navigate: NavigationRoutes.RandomAnimation,
  },
];

export default Reactiive;
