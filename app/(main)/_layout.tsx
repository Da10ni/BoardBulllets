// app/_layout.tsx
import { drawerItems } from "@/constants/drawerOptions";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Custom Drawer Header Component
interface CustomDrawerHeaderProps {
  title: string;
}

function CustomDrawerHeader({ title }: CustomDrawerHeaderProps) {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={headerStyles.container} edges={["top"]}>
      <View style={headerStyles.header}>
        <TouchableOpacity onPress={openDrawer} style={headerStyles.menuButton}>
          <Ionicons name="menu" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>{title}</Text>
        <View style={headerStyles.placeholder} />
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  menuButton: {
    padding: 8,
    marginLeft: -8,
    color: "4A90E2",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
});

// Custom Drawer Content Component

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const currentPath = usePathname();
  const handleNavigation = (route: string) => {
    router.navigate(route);
  };

  return (
    <View style={drawerStyles.container}>
      <SafeAreaView style={drawerStyles.safeArea}>
        {/* Profile Section */}
        <View style={drawerStyles.profileSection}>
          <View style={drawerStyles.profileContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/60x60.png?text=JD" }}
              style={drawerStyles.profileImage}
            />
            <View style={drawerStyles.profileInfo}>
              <Text style={drawerStyles.profileName}>JOHN DOE</Text>
              <Text style={drawerStyles.profileRole}>STUDENT</Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={drawerStyles.navigationSection}>
          {drawerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                drawerStyles.navigationItem,
                item.route === currentPath && drawerStyles.activeNavigationItem,
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={item.isActive ? "#ffffff" : "rgba(255, 255, 255, 0.8)"}
                style={drawerStyles.navigationIcon}
              />
              <Text
                style={[
                  drawerStyles.navigationText,
                  item.isActive && drawerStyles.activeNavigationText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Branding */}
        <View style={drawerStyles.brandingSection}>
          <Text style={drawerStyles.brandingText}>BOARDBULLETS</Text>
        </View>

        {/* Side indicator dots */}
        <View style={drawerStyles.sideIndicators}>
          <View style={drawerStyles.indicatorDot} />
          <View style={drawerStyles.indicatorDot} />
          <View style={drawerStyles.indicatorDot} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e64ad",
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#ffffff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  profileRole: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  completionContainer: {
    alignItems: "center",
  },
  completionCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  completionText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  navigationSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 2,
    borderRadius: 8,
  },
  activeNavigationItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  navigationIcon: {
    marginRight: 15,
    width: 20,
  },
  navigationText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  activeNavigationText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  brandingSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  brandingText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sideIndicators: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -30 }],
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginVertical: 4,
  },
});

// Main Layout Component
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "BoardBullets",
            header: () => <CustomDrawerHeader title="BOARDBULLETS" />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
