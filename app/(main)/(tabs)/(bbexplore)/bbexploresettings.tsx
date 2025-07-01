import { router } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const SettingsScreen = () => {
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account deleted"),
        },
      ]
    );
  };

  const handleChangePassword = () => {
    console.log("Change Password pressed");
  };

  const handleLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: () => router.navigate("/(auth)/login") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Gray Background Section */}
        <View style={styles.graySection} />

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <Text style={styles.userName}>JOHN DOE</Text>
          <Text style={styles.userEmail}>johndoe@gmail.com</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.buttonText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer for bottom padding */}
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999999",
    letterSpacing: 1,
  },
  graySection: {
    backgroundColor: "#C0C0C0",
    height: 200,
    marginBottom: 20,
  },
  userInfoSection: {
    backgroundColor: "#4864AC",
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    letterSpacing: 0.3,
  },
  buttonsContainer: {
    paddingHorizontal: 50,
  },
  actionButton: {
    backgroundColor: "#4864AC",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  spacer: {
    height: 50,
  },
});

export default SettingsScreen;