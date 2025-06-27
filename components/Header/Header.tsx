// components/Header/Header.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Header.styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Header: React.FC = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleMorePress = () => {
    console.log("More pressed");
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.headerButton}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>BOARDBULLETS</Text>
      <TouchableOpacity onPress={handleMorePress} style={styles.headerButton}>
        <Text style={styles.moreIcon}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;