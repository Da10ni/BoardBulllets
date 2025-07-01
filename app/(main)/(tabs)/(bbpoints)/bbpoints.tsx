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
import { CircularProgress } from "react-native-circular-progress";

const BBPointsScreen = () => {
  // Subscription status - ye prop se ya state management se aa sakti hai
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = () => {
    console.log("Subscribe pressed");
    router.push("/(main)/(tabs)/(pricing)/pricing");
    // Add subscription logic here
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Title */}
          <Text style={styles.headerTitle}>BB POINTS</Text>

          {/* Main Content */}
          <View style={styles.mainSection}>
            {/* Top Row - Overall Rank and Main Points */}
            <View style={styles.topRow}>
              {/* Left - Overall Rank */}
              <View style={styles.rankContainer}>
                <CircularProgress
                  size={80}
                  width={6}
                  fill={25}
                  tintColor="#4CAF50"
                  backgroundColor="#E5E5E5"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.rankContent}>
                      <Text style={styles.rankNumber}>25</Text>
                      <Text style={styles.rankSuperscript}>th</Text>
                    </View>
                  )}
                </CircularProgress>
                <Text style={styles.rankLabel}>OVERALL{"\n"}RANK</Text>
              </View>

              {/* Right - Main Points Circle */}
              <View style={styles.mainPointsContainer}>
                <CircularProgress
                  size={150}
                  width={8}
                  fill={75}
                  tintColor="#4CAF50"
                  backgroundColor="#6C7B7F"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.mainPointsContent}>
                      <Text style={styles.mainPointsNumber}>1500</Text>
                      <Text style={styles.mainPointsLabel}>
                        EARNED{"\n"}BB POINTS
                      </Text>
                    </View>
                  )}
                </CircularProgress>
              </View>
            </View>

            {/* Last Quiz Points */}
            <View style={styles.lastQuizSection}>
              <View style={styles.lastQuizLine} />
              <View style={styles.pointsRow}>
                <Text style={styles.lastQuizNumber}>15</Text>
                <View style={styles.pointStatLabel}>
                <Text style={styles.boldText}>BB</Text>
              <Text  style={{ fontSize: 12 }}>
              POINTS EARNED LAST QUIZ
              </Text>
              </View>
              </View>
              
            </View>

            {/* Bottom Row - Three Average Circles */}
            <View style={styles.bottomRow}>
              {/* Average Report/Question */}
              <View style={styles.averageContainer}>
                <CircularProgress
                  size={60}
                  width={4}
                  fill={50}
                  tintColor="#FFB84D"
                  backgroundColor="#E5E5E5"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.averageContent}>
                      <Text style={styles.averageNumber}>10</Text>
                    </View>
                  )}
                </CircularProgress>
                <Text style={styles.averageLabel}>
                  AVERAGE{"\n"}REPORT/QUESTION
                </Text>
              </View>

              {/* Average Report/Quiz */}
              <View style={styles.averageContainer}>
                <CircularProgress
                  size={60}
                  width={4}
                  fill={75}
                  tintColor="#4A90E2"
                  backgroundColor="#E5E5E5"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.averageContent}>
                      <Text style={styles.averageNumber}>15</Text>
                    </View>
                  )}
                </CircularProgress>
                <Text style={styles.averageLabel}>
                  AVERAGE{"\n"}REPORT/QUIZ
                </Text>
              </View>

              {/* Average Report/Daily */}
              <View style={styles.averageContainer}>
                <CircularProgress
                  size={60}
                  width={4}
                  fill={30}
                  tintColor="#FF6B6B"
                  backgroundColor="#E5E5E5"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.averageContent}>
                      <Text style={styles.averageNumber}>15</Text>
                    </View>
                  )}
                </CircularProgress>
                <Text style={styles.averageLabel}>
                  AVERAGE{"\n"}REPORT/DAILY
                </Text>
              </View>
            </View>

            {/* Conditional Subscribe Button */}
            {!isSubscribed && (
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={handleSubscribe}
              >
                <Text style={styles.subscribeText}>SUBSCRIBE</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
    letterSpacing: 1,
  },
  mainSection: {
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  rankContainer: {
    alignItems: "center",
    flex: 1,
  },
  rankContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
  },
  rankSuperscript: {
    fontSize: 12,
    fontWeight: "400",
    color: "#4CAF50",
    marginLeft: 2,
    marginTop: -5,
  },
  rankLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 0.5,
  },
  mainPointsContainer: {
    alignItems: "center",
    flex: 1,
  },
  mainPointsContent: {
    alignItems: "center",
  },
  mainPointsNumber: {
    fontSize: 28,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 5,
  },
  mainPointsLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  lastQuizSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  lastQuizLine: {
    width: 3,
    height: 30,
    backgroundColor: "#FF6B6B",
    marginRight: 10,
  },
  lastQuizNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginRight: 8,
  },
  lastQuizLabel: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  pointsRow: {
    flexDirection: "column",
  },
   pointStatLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
    gap: 4,
    flexDirection: "row",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  averageContainer: {
    alignItems: "center",
    flex: 1,
  },
  averageContent: {
    alignItems: "center",
  },
  averageNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  averageLabel: {
    fontSize: 9,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 0.5,
  },
  spacer: {
    height: 40,
  },
  subscribeButton: {
    backgroundColor: "#4864AC",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 20,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
});

export default BBPointsScreen;
