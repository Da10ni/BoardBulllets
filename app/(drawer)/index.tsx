import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
// import LastQuizScreen from '@/screens/LastQuizScreen';
// import BBPointsScreen from '@/screens/BBPointsScreen';
import CustomDrawerContent from "@/components/ui/CustomDrawer"; // custom drawer
// import { Linking } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="(home)" component={HomeScreen} />
      {/* <Drawer.Screen name="LastQuizReview" component={LastQuizScreen} />
      <Drawer.Screen name="BBPoints" component={BBPointsScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
