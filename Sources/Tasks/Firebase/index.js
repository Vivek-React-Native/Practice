import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PRContainer, RNText } from '../../Common';
import { NavigationRoutes, Strings } from '../../Constants';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors, hp, wp } from '../../Theme';

const Stack = createStackNavigator();

const Firebase = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Firebase Videos'} component={InnerScreens} />
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

const DATA = [];

export default Firebase;
