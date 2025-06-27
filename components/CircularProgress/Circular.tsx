import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../constants/Colors';

interface CircularProgressProps {
  size: number;
  width: number;
  fill: number;
  centerText: string;
  centerSubText: string;
  tintColor?: string;
  backgroundColor?: string;
}

const CircularProgressComponent: React.FC<CircularProgressProps> = ({
  size,
  width,
  fill,
  centerText,
  centerSubText,
  tintColor = Colors.primary,
  backgroundColor = Colors.secondary,
}) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.centerContent}>
            <Text style={styles.centerText}>{centerText}</Text>
            <Text style={styles.centerSubText}>{centerSubText}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  centerSubText: {
    fontSize: 12,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});

export default CircularProgressComponent;