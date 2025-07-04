// app/ResetPassword.tsx
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

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    // Here you would typically update the password
    Alert.alert(
      "Password Reset Successful",
      "Your password has been reset successfully. Please log in with your new password.",
      [
        {
          text: "OK",
          onPress: () => router.push("/login"),
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
        <Text style={styles.headerTitle}>
          <Text style={styles.b4}>B4 </Text>
          <Text style={styles.ai}>AI</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.learn}>Learn</Text>
          <Text style={styles.earn}> & Earn</Text>
        </Text>
      </View>

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <FontAwesome name="unlock-alt" size={40} color="#4864AC" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>CHANGE PASSWORD</Text>
          
          {/* Added margin top to push new password input down */}
          <View style={[styles.inputContainer, { marginTop: 70 }]}>
            <Ionicons
              name="person-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="NEW PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="CONFIRM NEW PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>SUBMIT</Text>
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
  headerTitle: {
    color: "white",
    fontSize: 20,
    letterSpacing: 1,
    left: 100,
  },
  b4: {
    fontWeight: "bold",
  },
  ai: {
    fontWeight: "normal",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    left: 120,
  },
  learn: {
    fontWeight: "bold",
  },
  earn: {
    fontWeight: "300",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 100,
    right: 5,
    zIndex: 1,
    marginRight: 10,
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  resetButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  resetButtonText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
  },
  copyright: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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

export default ResetPasswordScreen;