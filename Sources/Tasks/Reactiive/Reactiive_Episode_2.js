import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PRContainer, RNHeader, RNStyles } from '../../Common';
import { Colors, wp } from '../../Theme';
import { Strings } from '../../Constants';

const SIZE = wp(23); // 90
const CIRCLE_RADIUS = SIZE * 2; // 180
const PerfectRadius = CIRCLE_RADIUS + SIZE / 2; // 180 + 90/2 = 180 + 45 = (225)

const Reactiive_Episode_2 = () => {
  const TranslateX = useSharedValue(0);
  const TranslateY = useSharedValue(0);

  const PanGestureEvent = useAnimatedGestureHandler(
    {
      onStart: (event, context) => {
        // Storing Previous values to the context (Context is same as Redux)
        context.translationX = TranslateX.value;
        context.translationY = TranslateY.value;
      },
      onActive: (event, context) => {
        console.log('Event -> ', JSON.stringify(event, null, 2));
        // Storing Previous and current X and Y axis values to the sharedValue...
        TranslateX.value = event.translationX + context.translationX;
        TranslateY.value = event.translationY + context.translationY;
      },
      onEnd: () => {
        // Calculating perfect value for distance from radius of the circle when animation ends
        const distance = Math.sqrt(
          TranslateX.value ** 2 + TranslateY.value ** 2,
        );

        // for example.., X = 5, Y = 7
        // (5*5) + (7*7) = 25 + 49 = 74
        // square root of 74 = 8.60
        // Distance from the circle radius is 8.60 from 225

        if (distance < PerfectRadius) {
          TranslateX.value = withSpring(0);
          TranslateY.value = withSpring(0);
        }
      },
    },
    [],
  );

  const BoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: TranslateX.value },
        { translateY: TranslateY.value },
      ],
    };
  }, []);

  return (
    <PRContainer
      HeaderTitle={Strings.Reactiive_Episode_2}
      ContainerStyle={styles.content}>
      <View style={styles.Circle}>
        <PanGestureHandler onGestureEvent={PanGestureEvent}>
          <Animated.View style={[styles.Box, BoxStyle]} />
        </PanGestureHandler>
      </View>
    </PRContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  Box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: Colors.Orange,
    borderRadius: SIZE * 0.2,
  },
  Circle: {
    ...RNStyles.center,
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: Colors.Orange,
  },
});

export default Reactiive_Episode_2;
