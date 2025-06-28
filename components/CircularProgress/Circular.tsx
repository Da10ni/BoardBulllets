import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  correctPercentage: number;
  incorrectPercentage: number;
  centerText: string;
  centerSubText: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  correctPercentage,
  incorrectPercentage,
  centerText,
  centerSubText,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash arrays for correct and incorrect segments
  const correctStrokeDasharray = (correctPercentage / 100) * circumference;
  const incorrectStrokeDasharray = (incorrectPercentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Correct answers arc (teal) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4ECDC4"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${correctStrokeDasharray} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Incorrect answers arc (coral) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF6B6B"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${incorrectStrokeDasharray} ${circumference}`}
          strokeDashoffset={-correctStrokeDasharray}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center text */}
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>{centerText}</Text>
        <Text style={styles.centerSubText}>{centerSubText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  centerSubText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    letterSpacing: 1,
  },
});

export default CircularProgress;
