import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

const Typewriter = ({ texts, typingSpeed, colorCycleInterval }) => {
  const [visibleText, setVisibleText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    let timer;
    let colorTimer;

    const cycleColors = () => {
      colorTimer = setTimeout(() => {}, colorCycleInterval);
    };

    cycleColors();

    const animateText = () => {
      timer = setTimeout(() => {
        const currentText = texts[currentIndex];
        if (currentText) {
          if (visibleText.length < currentText.length) {
            setVisibleText(prevText => prevText + currentText[prevText.length]);
          } else {
            setCurrentColorIndex(
              prevColorIndex => (prevColorIndex + 1) % textColors.length,
            );
            setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
            setVisibleText('');
          }
        }
      }, typingSpeed);
    };

    animateText();

    return () => {
      clearTimeout(timer);
      clearTimeout(colorTimer);
    };
  }, [currentIndex, visibleText, texts, typingSpeed]);

  const currentColor = textColors[currentColorIndex];

  return (
    <Text style={[styles.text, { color: currentColor }]}>{visibleText}</Text>
  );
};

const textColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#008080', // Teal
  '#FFC0CB', // Pink
];

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Typewriter;
