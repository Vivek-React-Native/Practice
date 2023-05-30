import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNStyles } from '../../Common';
import { Colors, hp, wp } from '../../Theme';
import { Images } from '../../Constants';

const ImageWidth = wp(90);
const ImageHeight = hp(35);

const HorizontalImageSlider = () => {
  const FlatListRef = useRef();
  const [State, setState] = useState({ CurrentSlider: 0 });

  const onScroll = e => {
    const x = e?.nativeEvent?.contentOffset?.x;
    const width = e?.nativeEvent?.layoutMeasurement?.width;
    const slider = Math.round(x / width);
    setState(p => ({ ...p, CurrentSlider: slider }));
  };

  const onDotPress = index => {
    setState(p => ({ ...p, CurrentSlider: index }));
    FlatListRef.current.scrollToIndex({ index, animated: true });
  };

  const renderImages = ({ item, index }) => {
    return (
      <View style={styles.renderImageContainer}>
        <Image source={item} resizeMode={'cover'} style={RNStyles.image100} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          ref={FlatListRef}
          data={IMAGES}
          keyExtractor={(v, i) => String(i)}
          horizontal={true}
          onScroll={onScroll}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderImages}
        />
        <View style={styles.DotContainer}>
          {Array.from({ length: IMAGES.length }).map((v, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => onDotPress(i)}
              style={[
                styles.Dot,
                {
                  backgroundColor:
                    State.CurrentSlider === i ? Colors.Orange : Colors.DBDBDB,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
  },
  content: {
    width: ImageWidth,
    height: ImageHeight,
    alignSelf: 'center',
    marginVertical: hp(2),
    borderWidth: wp(0.3),
    borderColor: Colors.DBDBDB,
  },
  renderImageContainer: {
    width: ImageWidth - wp(0.6),
    height: ImageHeight,
  },
  DotContainer: {
    ...RNStyles.flexRowEvenly,
    width: wp(30),
    height: hp(4),
    position: 'absolute',
    bottom: hp(1),
    alignSelf: 'center',
  },
  Dot: {
    backgroundColor: Colors.White,
    width: wp(5),
    height: wp(5),
    borderRadius: 100,
  },
});

const IMAGES = [Images.Image_0, Images.Image_2, Images.Image_3, Images.Image_1];

export default HorizontalImageSlider;
