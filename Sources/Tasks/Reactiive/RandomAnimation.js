import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PRContainer, RNHeader, RNStyles } from '../../Common';
import { Strings } from '../../Constants';
import { Colors, hp, wp } from '../../Theme';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SIZE = wp(40);
const TOTAL = { width: wp(100), height: hp(80) };

const RandomAnimation = ({ navigation }) => {
  const WIDTH = useSharedValue(SIZE);
  const HEIGHT = useSharedValue(SIZE);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.width = WIDTH.value;
      context.height = HEIGHT.value;
    },
    onActive: (event, context) => {
      WIDTH.value = context.width + event.translationX;
      HEIGHT.value = context.height + event.translationY;
    },
    onEnd: () => {
      if (
        WIDTH.value > TOTAL.width * 0.9 ||
        HEIGHT.value > TOTAL.height * 0.9 ||
        WIDTH.value < SIZE * 0.2 ||
        HEIGHT.value < SIZE * 0.2
      ) {
        WIDTH.value = withSpring(SIZE);
        HEIGHT.value = withSpring(SIZE);
      }
    },
  });

  const BoxStyle = useAnimatedStyle(() => {
    return {
      width: WIDTH.value,
      height: HEIGHT.value,
    };
  });

  return (
    <PRContainer
      HeaderTitle={Strings.RandomAnimation}
      ContainerStyle={styles.content}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Reanimated.View style={[styles.Box, BoxStyle]} />
      </PanGestureHandler>
    </PRContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  Box: {
    backgroundColor: Colors.Red,
    width: SIZE,
    height: SIZE,
  },
});

export default RandomAnimation;
