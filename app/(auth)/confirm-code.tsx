// app/Verification.tsx
import AlertPopup from "@/components/Alert/Alert";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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

const VerificationScreen = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState(['', '', '', '']);
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
      Alert.alert("Error", "Please enter the complete verification code.");
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
      <StatusBar backgroundColor="#4864AC" barStyle="light-content" />
      <AlertPopup
        alertVisible={showAlert}
        setAlertVisible={setShowAlert}
        alertTitle="A new verification code has been sent to your email"
      />
      
      {/* Diagonal White Background */}
      <View style={styles.whiteBackground} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BOARDBULLETS</Text>
        <Text style={styles.headerSubtitle}>Learn & Earn</Text>
      </View>

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={40} color="#4864AC" />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>CONFIRM CODE</Text>
          
          {/* Code Input Boxes */}
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TouchableOpacity
                key={index}
                style={styles.codeInputWrapper}
                onPress={() => inputs.current[index]?.focus()}
              >
                <Text style={styles.codeInputNumber}>
                  {digit || ''}
                </Text>
                <TextInput
                  ref={(ref) => inputs.current[index] = ref}
                  style={styles.codeInput}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
                <View style={[
                  styles.codeInputLine,
                  digit ? styles.codeInputLineFilled : null
                ]} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit Button */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleVerifyCode}
            >
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

          {/* Resend Button */}
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendCode}
          >
            <Text style={styles.resendButtonText}>RESEND</Text>
          </TouchableOpacity>

          {/* Copyright Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              COPYRIGHT (C) 2017 BOARDBULLETS, INC.{'\n'}
              PRIVACY POLICY | TERMS
            </Text>
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
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    left: 90,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    left: 120,
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
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 1,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    paddingHorizontal: 40,
    width: "100%",
  },
  codeInputWrapper: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  codeInputNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    height: 30,
    textAlign: "center",
  },
  codeInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  codeInputLine: {
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1.5,
  },
  codeInputLineFilled: {
    backgroundColor: "white",
  },
  submitButtonContainer: {
    position: "relative",
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: "center",
    minWidth: 200,
  },
  submitButtonText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  resendButton: {
    marginBottom: 50,
    paddingVertical: 10,
  },
  resendButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: "center",
    marginTop: 60,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
    letterSpacing: 0.5,
  },
});

export default VerificationScreen;