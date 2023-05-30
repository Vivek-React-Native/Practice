import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../Constants';
import { RNStyles } from '../../Common';
import { Colors, hp, wp } from '../../Theme';
import Reanimated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import { interpolate } from 'react-native-reanimated';
import { Extrapolate } from 'react-native-reanimated';

const totalWidth = wp(100);
const imageWidth = wp(80);
const imageHeight = hp(50);

const ParallaxCarousel = () => {
  const translateX = useSharedValue(0);

  const IMAGES = [
    Images.Image_0,
    Images.Image_2,
    Images.Image_3,
    Images.Image_1,
  ];

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    translateX.value = contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Reanimated.FlatList
        data={IMAGES}
        keyExtractor={(v, i) => String(i)}
        horizontal={true}
        pagingEnabled={true}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RenderImages item={item} index={index} translateX={translateX} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
  renderImage: {
    width: wp(100),
    height: '100%',
    ...RNStyles.center,
  },
  Shadow: {
    ...RNStyles.shadow,
    backgroundColor: Colors.White,
    padding: wp(2),
    borderRadius: wp(3),
  },
  Overflow: {
    width: imageWidth,
    height: imageHeight,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  image: {
    width: imageWidth * 1.4,
    height: imageHeight,
  },
});

const RenderImages = ({ item, index, translateX }) => {
  const translateStyle = useAnimatedStyle(() => {
    const X = interpolate(
      translateX.value,
      [(index - 1) * totalWidth, index * totalWidth, (index + 1) * totalWidth],
      [-totalWidth * 0.7, 0, totalWidth * 0.7],
    );
    return {
      transform: [{ translateX: X }],
    };
  });

  return (
    <View style={styles.renderImage}>
      <View style={styles.Shadow}>
        <View style={styles.Overflow}>
          <Reanimated.Image
            source={item}
            resizeMode={'cover'}
            style={[styles.image, translateStyle]}
          />
        </View>
      </View>
    </View>
  );
};

export default ParallaxCarousel;
