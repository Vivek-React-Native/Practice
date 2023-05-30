import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles, RNText } from '../Common';
import { Colors, hp, wp } from '../Theme';
import { NavigationRoutes, Strings } from '../Constants';

const Screens = ({ navigation }) => {
  const AllScreens = [
    {
      title: Strings.HorizontalImageSlider,
      navigate: NavigationRoutes.HorizontalImageSlider,
    },
    {
      title: Strings.Reactiive,
      navigate: NavigationRoutes.Reactiive,
    },
    {
      title: Strings.CatalinMiron,
      navigate: NavigationRoutes.CatalinMiron,
    },
  ];

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
        data={AllScreens}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        renderItem={RenderScreens}
      />
    </View>
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

export default Screens;
