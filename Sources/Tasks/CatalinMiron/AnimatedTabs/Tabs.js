import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, findNodeHandle } from 'react-native';
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from '../../../Theme';
import { RNStyles, RNText } from '../../../Common';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const WIDTH = wp(100);

const Tabs = ({ data, scrollX }) => {
  const containerRef = useRef(null);

  const [Measure, setMeasure] = useState([]);
  console.log('Measure -> ', JSON.stringify(Measure, null, 2));

  useEffect(() => {
    setTimeout(() => {
      const m = [];
      data.forEach(item => {
        item.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            m.push({ x, y, width, height });
            if (m.length == data.length) {
              setMeasure(m);
            }
          },
        );
      });
    }, 0);
  }, []);

  return (
    <View style={styles.container}>
      <View ref={containerRef} style={RNStyles.flexRowAround}>
        {data?.map((v, i) => (
          <Tab key={i} ref={v.ref} item={v} />
        ))}
      </View>
      {Measure?.length > 0 && (
        <Indicator measure={Measure} data={data} scrollX={scrollX} />
      )}
    </View>
  );
};

const Indicator = ({ measure, data, scrollX }) => {
  const IndicatorStyle = useAnimatedStyle(() => {
    const inputRange = data?.map((v, i) => i * WIDTH);
    const widthOutputRange = measure?.map(v => v?.width);
    const translateXOutputRange = measure?.map(v => v?.x);

    const width = interpolate(scrollX.value, inputRange, widthOutputRange);
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      translateXOutputRange,
    );

    return {
      width,
      transform: [{ translateX }],
    };
  }, []);

  return <Reanimated.View style={[styles.Indicator, IndicatorStyle]} />;
};

const Tab = React.forwardRef(({ item }, ref) => {
  return (
    <View ref={ref} style={styles.renderTitleContainer}>
      <RNText style={styles.title}>{item?.title}</RNText>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: isIOS ? hp(6) : hp(1.5),
    zIndex: 1,
    width: '100%',
  },
  renderTitleContainer: {
    paddingVertical: hp(1),
  },
  title: {
    color: Colors.White,
    fontSize: FontSize.font18,
    fontFamily: FontFamily.OpenSans_SemiBold,
  },
  Indicator: {
    height: hp(0.4),
    width: wp(20),
    backgroundColor: Colors.White,
  },
});

export default Tabs;
