import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNButton, RNStyles } from '../../Common';
import { Colors, hp } from '../../Theme';
import ReAnimated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100;

const Reactiive_Episode_1 = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const handleRotation = progress => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const BoxStyle = useAnimatedStyle(() => {
    return {
      borderRadius: (progress.value * SIZE) / 2,
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    };
  });

  const onStartAnimation = () => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  };

  const onEndAnimation = () => {
    progress.value = withSpring(1);
    scale.value = withSpring(2);
  };

  return (
    <View style={styles.container}>
      <ReAnimated.View style={[styles.Box, BoxStyle]} />
      <RNButton title={'Start Animation'} onPress={onStartAnimation} />
      <RNButton title={'End Animation'} onPress={onEndAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  Box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: Colors.Blue,
    marginBottom: hp(10),
  },
});

export default Reactiive_Episode_1;
