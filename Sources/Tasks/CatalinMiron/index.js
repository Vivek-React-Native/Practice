import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles, RNText } from '../../Common';
import { NavigationRoutes, Strings } from '../../Constants';
import { createStackNavigator } from '@react-navigation/stack';
import Episode_1 from './CatalinMiron_Episode_1';
import { Colors, hp, wp } from '../../Theme';

const Stack = createStackNavigator();

const CatalinMiron = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name={'Catalin Miron Reanimated'}
        component={InnerScreens}
      />
      <Stack.Screen
        name={NavigationRoutes.CatalinMiron_Episode1}
        component={Episode_1}
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

const DATA = [
  {
    title: Strings.CatalinMiron_Episode1,
    navigate: NavigationRoutes.CatalinMiron_Episode1,
  },
];

export default CatalinMiron;
