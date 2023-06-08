import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationRoutes, Strings } from './Constants';
import {
  Screens,
  HorizontalImageSlider,
  Reactiive,
  CatalinMiron,
  ReRender,
  GIF,
  Clock,
  VideoPlayers,
} from './Tasks';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={NavigationRoutes.Screens}
          component={Screens}
          options={{ title: Strings.TaskList }}
        />
        <Stack.Screen
          name={NavigationRoutes.HorizontalImageSlider}
          component={HorizontalImageSlider}
        />
        <Stack.Screen name={NavigationRoutes.Reactiive} component={Reactiive} />
        <Stack.Screen
          name={NavigationRoutes.CatalinMiron}
          component={CatalinMiron}
        />
        <Stack.Screen
          name={NavigationRoutes.ReRenderIssue}
          component={ReRender}
        />
        <Stack.Screen name={NavigationRoutes.GIF} component={GIF} />
        <Stack.Screen name={NavigationRoutes.Clock} component={Clock} />
        <Stack.Screen
          name={NavigationRoutes.VideoPlayers}
          component={VideoPlayers}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  headerShown: false,
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
};

export default Routes;
