// app/SplashScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
export interface SplashScreenProps {
  onComplete?: () => void; // Callback jab splash complete ho
}

export interface SplashData {
  id: number;
  icon?: string; // Optional icon path or URI
  title: string; // Main heading text
  subtitle: string; // Description or caption
  isLogo?: boolean; // If true, show app logo
  showAuthButtons?: boolean; // Show LOGIN/SIGNUP buttons?
}

const { width, height } = Dimensions.get("window");

const splashData = [
  {
    id: 0,
    isLogo: true,
    title: "BOARDBULLETS",
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

    router.push("/login");
  };

  const handleSignup = () => {
    onComplete?.(); // Hide splash screen first

    router.push("/register");
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

      <LinearGradient colors={["#4864AC", "#357ABD"]} style={styles.gradient}>
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },

  // Fixed white background - never moves
  whiteBackground: {
    position: "absolute",
    top: -230,
    left: 70,
    width: 50,
    height: 530,
    backgroundColor: "white",
    transform: [{ skewY: `-40deg` }, { translateY: 70 }, { translateX: -20 }],
    transformOrigin: "top left",
    borderRadius: 340,
  },

  // Fixed header - never moves
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textAlign: "right",
  },

  // Fixed top logo - never moves
  topLogoContainer: {
    position: "absolute",
    top: 90,
    left: 30,
    zIndex: 20,
  },
  topLogoText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  // Carousel container - only this area moves
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 190,
  },

  // Individual carousel item
  carouselItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  // Logo screen styles
  mainLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logoText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },

  // Feature screen styles
  iconContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.3,
    fontWeight: "400",
  },

  // Fixed bottom section - never moves
  bottomSection: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
    alignItems: "center",
  },

  // Dots indicator
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },

  // Fixed auth buttons - never move
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 2,
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "white",
    flex: 1,
    marginRight: 10,
  },
  loginText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  signupButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  signupText: {
    color: "#4A90E2",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
});
