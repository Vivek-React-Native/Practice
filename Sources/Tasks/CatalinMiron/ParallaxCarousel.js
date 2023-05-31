import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Images } from '../../Constants';
import { RNButton, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import Reanimated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  StretchInY,
} from 'react-native-reanimated';

const totalWidth = wp(100);
const imageWidth = wp(80);
const imageHeight = hp(50);

const ParallaxCarousel = () => {
  const translateX = useSharedValue(0);
  const [State, setState] = useState({ IsCardStyle: false });

  const IMAGES = [
    Images.Image_0,
    Images.Image_2,
    Images.Image_3,
    Images.Image_1,
  ];
  const FullScreenImages = [
    {
      image: Images.Cat_1,
      title: 'Cat',
      description:
        'The cat has a strong flexible body, quick reflexes, sharp teeth, and retractable claws adapted to killing small. Its night vision and sense of smell are well developed.',
    },
    {
      image: Images.Dog_1,
      title: 'Dog',
      description:
        'A dog is a domestic mammal of the family Canidae and the order Carnivora. Its scientific name is Canis lupus familiaris.',
    },
    {
      image: Images.Lion_1,
      title: 'Lion',
      description: `Lions have strong, compact bodies and powerful forelegs, teeth and jaws for pulling down and killing prey.`,
    },
    {
      image: Images.Swan_1,
      title: 'Swan',
      description: `Swans are gracefully long-necked, heavy-bodied, big-footed birds that glide majestically when swimming and fly with slow wingbeats and with necks outstretched.`,
    },
  ];

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    translateX.value = contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <RNButton
        title={State.IsCardStyle ? 'Full Screen Style' : 'Card Style'}
        onPress={() => setState(p => ({ ...p, IsCardStyle: !p.IsCardStyle }))}
      />

      <Reanimated.FlatList
        data={FullScreenImages}
        keyExtractor={(v, i) => String(i)}
        horizontal={true}
        pagingEnabled={true}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          State.IsCardStyle ? (
            <RenderCards item={item} index={index} translateX={translateX} />
          ) : (
            <RenderFullScreen
              item={item}
              index={index}
              translateX={translateX}
            />
          )
        }
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
    width: imageWidth * 1.2,
    height: imageHeight,
  },
  renderFullScreen: {
    overflow: 'hidden',
  },
  fullscreenimage: {
    width: wp(100),
    height: '100%',
  },
  titleContainer: {
    ...RNStyles.center,
    position: 'absolute',
    bottom: hp(8),
    left: 0,
    right: 0,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    zIndex: 1,
  },
  title: {
    color: Colors.White,
    fontSize: FontSize.font28,
    fontFamily: FontFamily.OpenSans_SemiBold,
    textAlign: 'center',
    paddingBottom: hp(2),
  },
  description: {
    color: Colors.White,
    fontSize: FontSize.font16,
    fontFamily: FontFamily.OpenSans_Regular,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.Black + '30',
  },
});

const RenderFullScreen = ({ item, index, translateX }) => {
  const inputrange = [
    (index - 1) * totalWidth,
    index * totalWidth,
    (index + 1) * totalWidth,
  ];
  const ImageStyle = useAnimatedStyle(() => {
    const X = interpolate(translateX.value, inputrange, [
      -totalWidth * 0.8,
      0,
      totalWidth * 0.8,
    ]);
    return {
      transform: [{ translateX: X }],
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const X = interpolate(translateX.value, inputrange, [
      totalWidth * 2,
      0,
      -totalWidth * 2,
    ]);
    const opacity = interpolate(translateX.value, inputrange, [0, 1, 0]);
    return {
      opacity: opacity,
      transform: [{ translateX: X }],
    };
  });

  return (
    <View style={styles.renderFullScreen}>
      <Reanimated.Image
        source={item.image}
        resizeMode={'cover'}
        style={[styles.fullscreenimage, ImageStyle]}
      />
      <Reanimated.View style={[styles.titleContainer, titleStyle]}>
        <RNText style={styles.title}>{item.title}</RNText>
        <RNText style={styles.description}>{item.description}</RNText>
      </Reanimated.View>
      <View style={styles.overlay} />
    </View>
  );
};

const RenderCards = ({ item, index, translateX }) => {
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
            source={item.image || item}
            resizeMode={'cover'}
            style={[styles.image, translateStyle]}
          />
        </View>
      </View>
    </View>
  );
};

export default ParallaxCarousel;
