import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavItem } from "../../utils/type";

interface BottomNavigationProps {
  onNavPress: (id: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onNavPress }) => {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Ionicons name="home-outline" size={20} color="#3257a8" />,
      active: true,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <Feather name="user" size={20} color="#3257a8" />,
    },
    {
      id: "pricing",
      label: "Pricing",
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
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 20, // Account for safe area
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  activeLabel: {
    fontWeight: "600",
  },
});

export default BottomNavigation;
