import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNStyles } from '../../Common';
import { Images } from '../../Constants';
import { Colors, hp, isIOS, wp } from '../../Theme';
import ReAnimated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const totalWidth = wp(100);

const CatalinMiron_Carousel_1 = ({ navigation }) => {
  const translateX = useSharedValue(0);
  const IMAGES = [
    { image: Images.Dog_1 },
    { image: Images.Cat_1 },
    { image: Images.Lion_1 },
    { image: Images.Swan_1 },
  ];

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    translateX.value = contentOffset.x;
  });

  const RenderImage = ({ item }) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.Card}>
          <Image
            source={item.image}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.BackIcon}>
        <Image
          source={Images.LeftArrow}
          resizeMode={'contain'}
          style={RNStyles.icon}
        />
      </TouchableOpacity>

      {IMAGES.map((v, i) => {
        const BackgroundImageStyle = useAnimatedStyle(() => {
          const opacity = interpolate(
            translateX.value,
            [(i - 1) * totalWidth, i * totalWidth, (i + 1) * totalWidth],
            [0, 1, 0],
          );
          return {
            opacity: opacity,
          };
        });
        return (
          <ReAnimated.Image
            key={i}
            source={v.image}
            resizeMode={'cover'}
            blurRadius={25}
            style={[styles.BgImage, BackgroundImageStyle]}
          />
        );
      })}

      <ReAnimated.FlatList
        data={IMAGES}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(v, i) => String(i)}
        renderItem={RenderImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
  renderContainer: {
    ...RNStyles.center,
    width: wp(100),
    height: hp(100),
  },
  Card: {
    ...RNStyles.shadow,
    width: wp(80),
    height: hp(45),
    backgroundColor: Colors.White,
    borderRadius: wp(3),
  },
  image: {
    ...RNStyles.image100,
    borderRadius: wp(3),
  },
  BgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  BackIcon: {
    ...RNStyles.center,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: Colors.White,
    borderRadius: 100,
    top: isIOS ? hp(6) : hp(1.5),
    left: wp(4),
    width: wp(9),
    height: wp(9),
  },
});

export default CatalinMiron_Carousel_1;
