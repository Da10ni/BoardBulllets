import {
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SubscriptionScreen = () => {
  const handleSubscribe = () => {
    console.log("Subscribe pressed");
    router.push("/(main)/(tabs)/(home)");
    // Add subscription logic here
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>

        {/* Feature Icons Row */}
        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <FontAwesome6
              name="tablet-screen-button"
              size={28}
              color="#4864AC"
            />
          </View>
          <View style={styles.iconItem}>
            <MaterialIcons
              name="signal-cellular-alt"
              size={32}
              color="#4864AC"
            />
          </View>
          <View style={styles.iconItem}>
            <SimpleLineIcons name="badge" size={32} color="#4864AC" />
          </View>
          <View style={styles.iconItem}>
            <Ionicons name="trophy-outline" size={32} color="#4864AC" />
          </View>
        </View>

        {/* Upgrade Message */}
        <Text style={styles.upgradeTitle}>UPGRADE TO BB PREMIUM</Text>
        <Text style={styles.upgradeSubtitle}>
          GET FULL ACCESS TO PERFORMANCE ANALYTICS, ENTIRE QUESTION DATABASE &
          ADDITIONAL FEATURES
        </Text>

        {/* Subscription Options */}
        <View style={styles.subscriptionOptions}>
          {/* Monthly Option */}
          <View style={styles.subscriptionCard}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$ 9.99 USD</Text>
              <Text style={styles.period}>1 MONTH</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.radio}>
                <View style={styles.radioInner} />
              </View>
              <Text style={styles.radioLabel}>AUTO RENEW ON</Text>
            </View>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeText}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>

          {/* Yearly Option */}
          <View style={styles.subscriptionCard}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$ 24.99 USD</Text>
              <Text style={styles.period}>3 MONTHS</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.radio}>
                <View style={styles.radioInner} />
              </View>
              <Text style={styles.radioLabel}>AUTO RENEW ON</Text>
            </View>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeText}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription will auto-renew unless cancelled.
        </Text>

        {/* Restore Purchases */}
        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: "#4864AC",
    marginTop: 5,
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 1,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 60,
  },
  iconItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4864AC",
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  upgradeSubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 40,
    paddingHorizontal: 10,
    letterSpacing: 0.3,
  },
  subscriptionOptions: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  subscriptionCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    width: "80%",
    borderColor: "#E5E5E5",
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  period: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    letterSpacing: 1,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4864AC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4864AC",
  },
  radioLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  subscribeButton: {
    backgroundColor: "#4864AC",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  subscribeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  termsText: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    lineHeight: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  restoreButton: {
    paddingVertical: 10,
    marginBottom: 30,
  },
  restoreText: {
    color: "#4864AC",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default SubscriptionScreen;
