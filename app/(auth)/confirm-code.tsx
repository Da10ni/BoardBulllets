// app/Verification.tsx
import AlertPopup from "@/components/Alert/Alert";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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

const VerificationScreen = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [verificationCode, setVerificationCode] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [lastRouteName,setLastRouteName] = useState("")
  const navigation = useNavigation();

  useEffect(() => {
    // Get the last route in the stack
    const state = navigation.getState();
    const lastRoute = state?.routes?.[state.routes.length - 2];      
    if (lastRoute) {
      console.log('Last screen was:', lastRoute.name); // Name of the last screen
      setLastRouteName(lastRoute.name)
    }
  }, []);


  const handleVerifyCode = () => {
    if (!verificationCode) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }
    if (verificationCode.length < 4) {
      Alert.alert("Error", "Please enter a valid verification code.");
      return;
    }
console.log(lastRouteName)
    // Here you would typically verify the code
    Alert.alert("Code Verified", "Your code has been verified successfully.", [
      {
        text: "OK",
        onPress: () => { lastRouteName === "register" ? router.push("/login") : router.push("/change-password")},
      },
    ]);
  };

  const handleResendCode = () => {
    setShowAlert(true);
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
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <AlertPopup
        alertVisible={showAlert}
        setAlertVisible={setShowAlert}
        alertTitle="A new verification code has been sent to your email"
      />
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
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to {email || "your email"}. Please
          enter the code below.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyCode}
        >
          <Text style={styles.verifyButtonText}>Verify Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
        >
          <Text style={styles.resendButtonText}>Resend Code</Text>
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
    textAlign: "center",
    letterSpacing: 2,
  },
  verifyButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendButton: {
    alignItems: "center",
    marginBottom: 30,
  },
  resendButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    textDecorationLine: "underline",
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

export default VerificationScreen;
