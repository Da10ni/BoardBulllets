import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Text style={styles.title}>BOARDBULLETS</Text>

      <DrawerItem
        label="Home"
        icon={({ color, size }) => <Feather name="home" color={color} size={size} />}
        onPress={() => navigation.navigate('Home')}
      />

      <DrawerItem
        label="Last Quiz Review"
        icon={({ color, size }) => <MaterialIcons name="history" color={color} size={size} />}
        onPress={() => navigation.navigate('Home')}
      />

      <DrawerItem
        label="BB Points"
        icon={({ color, size }) => <Feather name="award" color={color} size={size} />}
        onPress={() => navigation.navigate('Home')}
      />

      <DrawerItem
        label="Visit Website"
        icon={({ color, size }) => <Ionicons name="globe-outline" color={color} size={size} />}
        onPress={() => Linking.openURL('https://yourwebsite.com')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CustomDrawer;
