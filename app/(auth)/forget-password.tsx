// app/ForgotPassword.tsx
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Here you would typically send the verification code
    Alert.alert(
      "Verification Code Sent",
      "Please check your email for the verification code.",
      [
        {
          text: "OK",
          onPress: () =>
            router.push({
              pathname: "/confirm-code",
              params: { email: email },
            }),
        },
      ]
    );
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4864AC" barStyle="light-content" />

      {/* Diagonal White Background */}
      <View style={styles.whiteBackground} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitleBold}>BOARD</Text>
          <Text style={styles.headerTitleNormal}>BULLETS</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.headerSubtitleBold}>Learn</Text>
          <Text style={styles.headerSubtitleNormal}> & Earn</Text>
        </View>
      </View>

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <FontAwesome name="lock" size={50} color="#4864AC" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>FORGOT PASSWORD</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="EMAIL ADDRESS"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
            <Text style={styles.sendButtonText}>SUBMIT</Text>
          </TouchableOpacity>

          <View style={styles.copyright}>
            <Text style={styles.statement}>COPYRIGHT (C) 2017 B4AI,INC.</Text>
            <Text style={styles.policy}>PRIVACY POLICY AND TERMS OF USE</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4864AC",
  },
  whiteBackground: {
    position: "absolute",
    top: -170,
    left: 40,
    width: 50,
    height: 570,
    borderRadius: 360,
    backgroundColor: "white",
    transform: [{ skewY: "-40deg" }],
    transformOrigin: "top left",
    zIndex: 0,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 90,
  },
  headerTitleBold: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold", // BOARD bold
    letterSpacing: 1,
  },
  headerTitleNormal: {
    color: "white",
    fontSize: 20,
    fontWeight: "200", // BULLETS normal weight
    letterSpacing: 1,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 120,
    marginTop: 5,
  },
  headerSubtitleBold: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold", // Learn bold
  },
  headerSubtitleNormal: {
    color: "white",
    fontSize: 16,
    fontWeight: "200", // & Earn same weight as BULLETS
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 100,
    right: 5,
    zIndex: 1,
  },
  iconCircle: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "normal", // Weight kam kiya
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  sendButtonText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
  },
  backToLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  backToLoginLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  copyright: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  statement: {
    color: "#ebeae8",
    fontSize: 10,
  },
  policy: {
    color: "#ebeae8",
    fontSize: 10,
  },
});

export default ForgotPasswordScreen;
