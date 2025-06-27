import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import HomeScreen from '@/components/Home/Home';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <HomeScreen/>;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}