import { Stack } from "expo-router";
import React from "react";
//import HomeScreen from ".";
const HomeLayout = () => {
  return (
    <Stack>
      
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
    
  );
};

export default HomeLayout;
