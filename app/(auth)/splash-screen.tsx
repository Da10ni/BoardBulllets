// app/SplashScreen.tsx
import { FontAwesome6, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  onComplete?: () => void;
}

export interface SplashData {
  id: number;
  icon?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  title: string;
  subtitle: string | { normal: string; bold: string; bold2: string };
  isLogo?: boolean;
  showAuthButtons?: boolean;
}

const { width, height } = Dimensions.get("window");

const splashData: SplashData[] = [
  {
    id: 0,
    isLogo: true,
    title: "B4AI",
    subtitle: "",
  },
  {
    id: 1,
    icon4: "tablet-screen-button",
    title: "USER FRIENDLY DESIGN",
    subtitle: {
      normal: "FOR OPTIMAL REVIEW OF HIGH-YEILD MATERIAL\n",
      bold: "",
      bold2:"USER FRIENDLY DESIGN\n",
    },
  },
  {
    id: 2,
    icon2: "signal-cellular-alt",
    title: "PERFORMANCE GOALS",
    subtitle: {
      normal: "PERFORMANCE DATA &\nANALYTICS TO",
      bold: " TRACK\nYOUR PROGRESS",
      bold2:""
    },
  },
  {
    id: 3,
    icon: "trophy-outline",
    title: "EARN BIG POINTS",
    subtitle: {
      bold:"",
      normal: " FROM \n QUESTIONS SHARED ON \n A PEER-TO-PEER NETWORK \n",
      bold2: "EARN BB POINTS",
    },
  },
  {
    id: 4,
    icon3: "badge",
    title: "UPGRADE TO PREMIUM",
    subtitle: {
      bold2:"UPGRADE TO PREMIUM & ",
      normal: "GET\nFULL-ACCESS TO ALL OUR\n FEATURES & MORE",
      bold: "",
    },
  },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogin = () => {
    onComplete?.();
    router.push("/login");
  };

  const handleSignup = () => {
    onComplete?.();
    router.push("/register");
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.push("/login");
        }else if(token){
          router.push("/(main)/(tabs)/(home)");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        router.push("/login");
      }
    };
  
    checkToken();
  }, []);

  const renderCarouselItem = ({ item }: { item: SplashData }) => (
    <View style={styles.carouselItemContainer}>
      {item.isLogo ? (
        <View style={styles.mainLogoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoTextBold}>B4 </Text>
            <Text style={styles.logoTextNormal}>AI</Text>
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              {item.icon && <Ionicons name={item.icon as any} size={60} color="white" />}
              {!item.icon && item.icon2 && (
                <MaterialIcons name={item.icon2 as any} size={60} color="white" />
              )}
              {!item.icon && item.icon3 && (<SimpleLineIcons name={item.icon3 as any} size={60} color = "white"/>)}
              {!item.icon && item.icon4 && (<FontAwesome6 name={item.icon4 as any} size={60} color = "white"/>)}
            </View>
          </View>
          {/* <Text style={styles.title}>{item.title}</Text> */}
          {typeof item.subtitle === "string" ? (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          ) : (
            <Text style={styles.subtitle}>
               <Text style={styles.boldText}>{item.subtitle.bold2}</Text>
              {item.subtitle.normal}
              <Text style={styles.boldText}>{item.subtitle.bold}</Text>
            </Text>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={overlayStyles.overlay}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <LinearGradient colors={["#4864AC", "#357ABD"]} style={styles.gradient}>
        <View style={styles.whiteBackground} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            <Text style={styles.headerTextBold}>Learn</Text>
            <Text style={styles.headerTextNormal}> & Earn </Text>
          </Text>
        </View>

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
            {splashData.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentIndex ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
          </View>

          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

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
  gradient: { flex: 1 },
  whiteBackground: {
    position: "absolute",
    top: -230,
    left: 70,
    width: 50,
    height: 530,
    backgroundColor: "white",
    transform: [{ skewY: "-40deg" }, { translateY: 70 }, { translateX: -20 }],
    borderRadius: 340,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: { color: "white", fontSize: 16, letterSpacing: 1 },
  headerTextBold: { fontWeight: "bold" },
  headerTextNormal: { fontWeight: "200" },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 190,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  mainLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logoText: {
    color: "white",
    fontSize: 38,
    letterSpacing: 2,
    textAlign: "center",
    width: "100%",
    lineHeight: 44,
  },
  logoTextBold: { fontWeight: "800" },
  logoTextNormal: { fontWeight: "300" },
  iconContainer: { marginBottom: 25, alignItems: "center" },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 18,
    textAlign: "center",
    //lineHeight: 18,
    letterSpacing: 0.8,
    fontWeight: "400",
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  bottomSection: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
    alignItems: "center",
  },
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
  activeDot: { backgroundColor: "white" },
  inactiveDot: { backgroundColor: "rgba(255, 255, 255, 0.4)" },
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "white",
    flex: 1,
    marginRight: 10,
  },
  loginText: {
    color: "#4864AC",
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
  },
  signupText: {
    color: "#4864AC",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
});