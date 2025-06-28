import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
        }}
      />
      <Stack.Screen
        name="BBExplore"
        options={{
          headerShown: false,
          title: "Explore",
        }}
      />
    </Stack>
  );
}
