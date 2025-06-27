import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface StatCardProps {
  percentage: string;
  label: string;
  sublabel: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ percentage, label, sublabel, color }) => {
  return (
    <View style={statCardStyles.container}>
      <View style={statCardStyles.percentageContainer}>
        <Text style={[statCardStyles.percentage, { color }]}>{percentage}</Text>
      </View>
      <Text style={statCardStyles.label}>{label}</Text>
      <Text style={statCardStyles.sublabel}>{sublabel}</Text>
    </View>
  );
};

const statCardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
  },
  percentageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 2,
  },
  sublabel: {
    fontSize: 9,
    color: Colors.text.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default StatCard;