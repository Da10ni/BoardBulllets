// app/SplashScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SplashScreenProps } from "../components/Splash/splashScreenTypes"; // Your original types file
import { styles } from "../styles/splashScreenStyle"; // Your original styles file

const { width, height } = Dimensions.get("window");

const splashData = [
  {
    id: 0,
    isLogo: true,
    title: "B4AI",
    subtitle: "",
  },
  {
    id: 1,
    icon: "desktop-outline",
    title: "USER FRIENDLY DESIGN",
    subtitle: "SIMPLIFIED INTERFACE FOR\nEASY NAVIGATION",
  },
  {
    id: 2,
    icon: "bar-chart-outline",
    title: "PERFORMANCE GOALS",
    subtitle: "TRACK YOUR PROGRESS WITH\nDETAILED ANALYTICS",
  },
  {
    id: 3,
    icon: "trophy-outline",
    title: "EARN BIG POINTS",
    subtitle: "COMPETE WITH OTHERS AND\nWIN REWARDS",
  },
  {
    id: 4,
    icon: "star-outline",
    title: "UPGRADE TO PREMIUM",
    subtitle: "UNLOCK ADVANCED FEATURES\nAND PREMIUM CONTENT",
  },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogin = () => {
    onComplete?.(); // Hide splash screen first

    router.push("/Login");
  };

  const handleSignup = () => {
    onComplete?.(); // Hide splash screen first

    router.push("/Signup");
  };

  const renderCarouselItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.carouselItemContainer}>
        {item.isLogo ? (
          <View style={styles.mainLogoContainer}>
            <View style={styles.logoBackground}>
              <Text style={styles.logoText}>{item.title}</Text>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name={item.icon as any} size={40} color="#4A90E2" />
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={overlayStyles.overlay}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <LinearGradient colors={["#4A90E2", "#357ABD"]} style={styles.gradient}>
        <View style={styles.whiteBackground} />
        <View style={styles.header}>
          <Text style={styles.headerText}>LEARN & EARN!</Text>
        </View>
        <View style={styles.topLogoContainer}></View>

        <View style={styles.carouselContainer}>
          <Carousel
            width={width}
            height={height * 0.4}
            data={splashData}
            scrollAnimationDuration={300}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={renderCarouselItem}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.dotsContainer}>
            {splashData.map((_, dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  styles.dot,
                  dotIndex === currentIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* âœ… LOGIN / SIGN UP Navigation - Original code with fixed routing */}
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// Overlay styles to make splash screen appear on top
const overlayStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});
