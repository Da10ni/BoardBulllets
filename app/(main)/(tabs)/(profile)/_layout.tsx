import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="editProfile" />
    </Stack>
  );
};

export default ProfileLayout;
