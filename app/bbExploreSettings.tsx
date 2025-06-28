import React from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      { text: "Log Out", onPress: () => console.log("User logged out") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BOARDBULLETS</Text>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>SETTINGS</Text>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    letterSpacing: 1,
  },
  pageTitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1,
    fontWeight: "500",
  },
  graySection: {
    backgroundColor: "#C0C0C0",
    height: 200,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  userInfoSection: {
    backgroundColor: "#5B8BC4",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 8,
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
    paddingHorizontal: 40,
    marginBottom: 50,
  },
  actionButton: {
    backgroundColor: "#5B8BC4",
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
});

export default SettingsScreen;
