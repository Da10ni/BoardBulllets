import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BBExploreScreen = () => {
  const handleManageSubscription = () => {
    console.log("Manage Subscription pressed");
  };

  const handleAboutBoardBullets = () => {
    console.log("About BoardBullets pressed");
  };

  const handleSettings = () => {
    console.log("Settings pressed");
    router.push("/bbExploreSettings");
  };

  const handleSocialMedia = (platform) => {
    console.log(`${platform} pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>BOARDBULLETS</Text>

        <TouchableOpacity style={styles.moreButton}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>BB EXPLORE</Text>

      {/* Gray Background Section */}
      <View style={styles.graySection} />

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleManageSubscription}
        >
          <Text style={styles.buttonText}>MANAGE SUBSCRIPTION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAboutBoardBullets}
        >
          <Text style={styles.buttonText}>ABOUT BOARDBULLETS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
          <Text style={styles.buttonText}>SETTINGS</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity
          style={[styles.socialIcon, styles.facebookIcon]}
          onPress={() => handleSocialMedia("Facebook")}
        >
          <Icon name="facebook" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIcon, styles.twitterIcon]}
          onPress={() => handleSocialMedia("Twitter")}
        >
          <Icon name="twitter" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIcon, styles.instagramIcon]}
          onPress={() => handleSocialMedia("Instagram")}
        >
          <Icon name="instagram" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#999" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="shopping-cart" size={24} color="#999" />
          <Text style={styles.navText}>Pricing</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuButton: {
    width: 24,
    height: 24,
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: "#4A90E2",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    letterSpacing: 1,
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 20,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#999",
    borderRadius: 2,
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
    marginBottom: 40,
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
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
  socialIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
  facebookIcon: {
    backgroundColor: "#5B8BC4",
  },
  twitterIcon: {
    backgroundColor: "#5B8BC4",
  },
  instagramIcon: {
    backgroundColor: "#5B8BC4",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    fontWeight: "500",
  },
});

export default BBExploreScreen;
