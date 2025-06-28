import { Stack } from "expo-router";
import React from "react";

const BBLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bbexplore" />
      <Stack.Screen name="bbexploresettings" />
    </Stack>
  );
};

export default BBLayout;
