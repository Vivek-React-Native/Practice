import React from 'react';
import { View } from 'react-native';
import { RNStyles } from '../../Common';
import Typewriter from './Typewriter';

const Writer = ({ navigation }) => {
  const texts = [
    'Welcome to React Native!',
    'Hello World!',
    'I am Vivek Ghodadra',
  ];
  const typingSpeed = 100;
  const colorCycleInterval = 1000;

  return (
    <View style={RNStyles.flexCenter}>
      <Typewriter
        texts={texts}
        typingSpeed={typingSpeed}
        colorCycleInterval={colorCycleInterval}
      />
    </View>
  );
};

export default Writer;
