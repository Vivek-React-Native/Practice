import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNHeader, RNStyles, RNText } from '../../Common';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors, hp, wp } from '../../Theme';
import { NavigationRoutes, Strings } from '../../Constants';
import ParallaxCarousel from './ParallaxCarousel';
import CatalinMiron_Carousel_1 from './CatalinMiron_Carousel_1';

const Stack = createStackNavigator();

const CatalinMiron = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={'Catalin Miron Reanimated'}
        component={InnerScreens}
      />
      <Stack.Screen
        name={NavigationRoutes.ParallaxCarousel}
        component={ParallaxCarousel}
      />
      <Stack.Screen
        name={NavigationRoutes.CatalinMiron_Carousel_1}
        component={CatalinMiron_Carousel_1}
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
      <RNHeader title={Strings.CatalinMiron} />
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
    title: Strings.ParallaxCarousel,
    navigate: NavigationRoutes.ParallaxCarousel,
  },
  {
    title: Strings.CatalinMiron_Carousel_1,
    navigate: NavigationRoutes.CatalinMiron_Carousel_1,
  },
];

export default CatalinMiron;
