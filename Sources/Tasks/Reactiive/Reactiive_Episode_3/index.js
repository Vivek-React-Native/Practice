import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors } from '../../../Theme';
import Page from './Page';
import { RNHeader, RNStyles } from '../../../Common';
import { Strings } from '../../../Constants';

const WORDS = [
  { name: 'React Native', color: Colors.Blue },
  { name: 'ReactJS', color: Colors.Blue + '70' },
  { name: 'NodeJS', color: Colors.Green },
  { name: 'NextJS', color: Colors.Blue + '70' },
];

const Reactiive_Episode_3 = () => {
  const TranslateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    console.log('event -> ', JSON.stringify(event, null, 2));
    TranslateX.value = event.contentOffset.x;
  }, []);

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.Reactiive_Episode_3} />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}>
        {WORDS.map((v, i) => (
          <Page key={i} item={v} index={i} TranslateX={TranslateX} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Reactiive_Episode_3;
