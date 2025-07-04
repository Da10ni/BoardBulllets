import Icon from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BBExploreScreen = () => {
  const handleManageSubscription = () => {
    console.log("Manage Subscription pressed");
  };

  const handleAboutB4AI = () => {
    console.log("About B4AI pressed");
  };

  const handleSettings = () => {
    console.log("Settings pressed");
    router.push("/bbexploresettings");
  };

  const handleSocialMedia = (platform: any) => {
    console.log(`${platform} pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            onPress={handleAboutB4AI}
          >
            <Text style={styles.buttonText}>ABOUT B4AI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSettings}
          >
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
    marginBottom: 40,
  },
  buttonsContainer: {
    paddingHorizontal: 40,
    marginBottom: 50,
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
    backgroundColor: "#4864AC",
  },
  twitterIcon: {
    backgroundColor: "#4864AC",
  },
  instagramIcon: {
    backgroundColor: "#4864AC",
  },
  spacer: {
    height: 50,
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
