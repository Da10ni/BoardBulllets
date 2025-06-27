import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@/components/Home/Home';
// import LastQuizScreen from '@/screens/LastQuizScreen';
// import BBPointsScreen from '@/screens/BBPointsScreen';
import CustomDrawerContent from '@/components/ui/CustomDrawer'; // custom drawer
import QuizMe from '@/components/QuizMe/QuizMe';
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
      <Drawer.Screen name="Home" component={HomeScreen} />
    {/* <Drawer.Screen name="LastQuizReview" component={QuizMe} />
      <Drawer.Screen name="BBPoints" component={BBPointsScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
