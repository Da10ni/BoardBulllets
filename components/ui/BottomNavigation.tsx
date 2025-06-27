import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { NavItem } from '../../utils/type';
import { Feather, Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  onNavPress: (id: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onNavPress }) => {
  const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Ionicons name="home-outline" size={20} color="#3257a8" />,
    active: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <Feather name="user" size={20} color="#3257a8" />,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: <Feather name="shopping-cart" size={20} color="#3257a8" />,
  },
];
  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          onPress={() => onNavPress(item.id)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.label, item.active && styles.activeLabel]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 20, // Account for safe area
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default BottomNavigation;