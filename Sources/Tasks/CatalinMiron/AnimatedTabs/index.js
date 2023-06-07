import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { RNHeader, RNStyles } from '../../../Common';
import { Images, Strings } from '../../../Constants';
import { Colors, hp, wp } from '../../../Theme';
import Reanimated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Tabs from './Tabs';

const AnimatedTabs = () => {
  const data = [
    { image: Images.Cat_1, title: Strings.Cat, ref: React.createRef() },
    { image: Images.Dog_1, title: Strings.Dog, ref: React.createRef() },
    { image: Images.Lion_1, title: Strings.Lion, ref: React.createRef() },
    { image: Images.Swan_1, title: Strings.Swan, ref: React.createRef() },
  ];
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    scrollX.value = contentOffset.x;
  });

  return (
    <View style={RNStyles.container}>
      <StatusBar barStyle={'light-content'} />
      <RNHeader title={Strings.AnimatedTabs} />

      <View style={styles.container}>
        <Reanimated.FlatList
          data={data}
          keyExtractor={(v, i) => String(i)}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <View style={styles.overlay} />
              <Image
                source={item.image}
                resizeMode={'cover'}
                style={RNStyles.image100}
              />
            </View>
          )}
        />
        <Tabs data={data} scrollX={scrollX} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
  imageContainer: {
    width: wp(100),
    height: hp(100),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.Black + '30',
  },
});

export default AnimatedTabs;
