import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PRContainer, RNHeader, RNStyles, RNText } from '../../Common';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Colors, hp, wp } from '../../Theme';
import { NavigationRoutes, Strings } from '../../Constants';
import CustomVideoPlayer from './CustomVideoPlayer';

const Stack = createStackNavigator();

const VideoPlayers = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Video Screens'} component={InnerScreens} />
      <Stack.Screen
        name={NavigationRoutes.CustomVideoPlayer}
        component={CustomVideoPlayer}
      />
    </Stack.Navigator>
  );
};

const InnerScreens = ({ navigation }) => {
  const RenderScreens = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.navigate)}
        style={styles.renderScreens}>
        <RNText>{item.title}</RNText>
      </TouchableOpacity>
    );
  };

  return (
    <PRContainer HeaderTitle={Strings.VideoPlayers}>
      <FlatList
        data={DATA}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(v, i) => String(i)}
        renderItem={RenderScreens}
      />
    </PRContainer>
  );
};
const DATA = [
  {
    title: Strings.CustomVideoPlayer,
    navigate: NavigationRoutes.CustomVideoPlayer,
  },
];

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
export default VideoPlayers;
