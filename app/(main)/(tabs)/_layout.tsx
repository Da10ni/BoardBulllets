import { IconSymbol } from "@/components/ui/IconSymbol";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color="#4A90E2"/>
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-o"  color="#4A90E2" />
          ),
        }}
      />
      <Tabs.Screen
        name="(pricing)/pricing"
        options={{
          title: "Pricing",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={28}  color="#4A90E2" />
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
