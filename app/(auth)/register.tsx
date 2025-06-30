// app/Signup.tsx
import AlertPopup from "@/components/Alert/Alert";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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

const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSignup = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }
    setShowAlert(true);

    // Add your signup logic here
  };

  const handleLogin = () => {
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
        alertTitle="A Verification Code has been sent to the given email"
        onSuccess={() => router.push("/confirm-code")}
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
          <Ionicons name="person-outline" size={40} color="#4864AC" />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>SIGN UP</Text>
          <Text style={styles.subtitle}>
            TO CREATE A BOARDBULLETS ACCOUNT
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="FIRST NAME"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="LAST NAME"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="EMAIL"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Dropdown 1 */}
          <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>
              {selectedOption1 || "CHOOSE ONE"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>

          {/* Dropdown 2 */}
          <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>
              {selectedOption2 || "CHOOSE ONE"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>

          {/* Submit Button Container */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          {/* Terms Text */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              BY TAPPING SIGN UP, YOU AGREE TO OUR{'\n'}
              <Text style={styles.linkText}>PRIVACY POLICY</Text> & <Text style={styles.linkText}>TERMS OF USE</Text>.
            </Text>
          </View>

          {/* Copyright */}
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>
              COPYRIGHT (C) 2017 BOARDBULLETS, INC.
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
    top: -30,
    left: 20,
    width: 50,
    height: 200,
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
    marginTop: -55,
    right: 117,
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    marginBottom: 15,
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
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dropdownText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
  },
  submitButtonContainer: {
    position: "relative",
    marginTop: 20,
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    minWidth: 200,
  },
  signupButtonText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  termsContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  linkText: {
    textDecorationLine: "underline",
  },
  copyrightContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  copyrightText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

export default SignupScreen;