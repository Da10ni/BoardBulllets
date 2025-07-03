import { IconSymbol } from "@/components/ui/IconSymbol";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function TabsLayout() {
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // GLOBAL COLOR SETTINGS
        tabBarActiveTintColor: "#4864AC", // Active tab color (currently blue)
        tabBarInactiveTintColor: "#B0B0B0", // Inactive tab color (light gray)

        // OPTIONAL: Additional styling
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          position: Platform.OS === "ios" ? "absolute" : undefined,
          backgroundColor: "#FFFFFF", // Tab bar background
          borderTopColor: "#E5E7EB", // Top border color
          borderTopWidth: 1,
          paddingTop: 5,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          height: Platform.OS === "ios" ? 85 : 65,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={focused ? "#4864AC" : "#4864AC"} // Using the same colors
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome 
              size={28} 
              name="user-o" 
              color={focused ? "#4864AC" : "#4864AC"} // Using the same colors
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(pricing)/pricing"
        options={{
          title: "Pricing",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign 
              name="shoppingcart" 
              size={28} 
              color={focused ? "#4864AC" : "#4864AC"} // Using the same colors
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(quiz)/quiz"
        options={{
          headerShown: false,
          title: "Quiz",
          href: null,
        }}
      />
      <Tabs.Screen
        name="(question)"
        options={{
          headerShown: false,
          title: "Question",
          href: null,
        }}
      />
      <Tabs.Screen
        name="(bbexplore)"
        options={{
          headerShown: false,
          title: "BB Explore",
          href: null,
        }}
      />
      <Tabs.Screen
        name="(performance)/performance"
        options={{
          headerShown: false,
          title: "Performance",
          href: null,
        }}
      />
      <Tabs.Screen
        name="(bbpoints)/bbpoints"
        options={{
          headerShown: false,
          title: "BB Points",
          href: null,
        }}
      />
    </Tabs>
  );
}
