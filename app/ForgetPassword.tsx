// app/ForgotPassword.tsx
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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
              pathname: "/ConfirmCode",
              params: { email: email },
            }),
        },
      ]
    );
  };

  const handleBackToLogin = () => {
    router.push("/Login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>â†</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOARDBULLETS</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <View style={styles.logo} />
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a verification code to
          reset your password.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
          <Text style={styles.sendButtonText}>Send Verification Code</Text>
        </TouchableOpacity>

        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Remember your password? </Text>
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.backToLoginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  logoBackground: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 15,
    backgroundColor: "white",
    borderRadius: 15,
    transform: [{ rotate: "-45deg" }],
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 30,
    color: "white",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  sendButtonText: {
    color: "#4A90E2",
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
});

export default ForgotPasswordScreen;
