import { Entypo, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const MyPerformanceScreen = () => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNavPress = (id: string) => {
    console.log(`Navigating to: ${id}`);
  };

  const handleCategoryPress = () => {
    console.log("Category pressed");
  };

  const handleTimedPress = () => {
    console.log("Timed pressed");
  };

  const handleQuizModePress = () => {
    console.log("Quiz Mode pressed");
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
          <Text style={styles.headerTitle}>MY PERFORMANCE</Text>

          {/* First Section - Circular Progress with Side Stats */}
          <View style={styles.performanceSection}>
            <View style={styles.mainStatsContainer}>
              {/* Left Side - Progress Circle */}
              <View style={styles.circularContainer}>
                <CircularProgress
                  size={140}
                  width={20}
                  fill={55}
                  tintColor="#4ECDC4"
                  backgroundColor="#FF6B6B"
                  rotation={0}
                >
                  {() => (
                    <View style={styles.progressContent}>
                      <Text style={styles.progressNumber}>55%</Text>
                    </View>
                  )}
                </CircularProgress>
              </View>

              {/* Right Side - Stats */}
              <View style={styles.sideStats}>
                <View style={styles.sideStatItem}>
                  <View style={styles.statLine} />
                  <View style={styles.bottomrow}>
                    <Text style={styles.sideStatNumber}>2000</Text>
                    <View style={styles.bottomStatLabel}>
                    <Text style={[styles.boldText, {fontSize:10}]}>TOTAL</Text>
                    <Text style={{ fontSize: 10 }}>QUESTIONS ATTEMPTED</Text>
                  </View>
                  </View>
                </View>

                <View style={styles.sideStatItem}>
                  <View
                    style={[styles.statLine, { backgroundColor: "#4ECDC4" }]}
                  />
                  <View style={styles.bottomrow}>
                    <Text style={[styles.sideStatNumber, { color: "#4ECDC4" }]}>
                      1100
                    </Text>
                    <View style={styles.bottomStatLabel}>
                    <Text style={[styles.boldText, {fontSize:10}]}>TOTAL</Text>
                    <Text style={{ fontSize: 10 }}>QUESTIONS CORRECT</Text>
                  </View>
                  </View>
                </View>

                <View style={styles.sideStatItem}>
                  <View
                    style={[styles.statLine, { backgroundColor: "#FF6B6B" }]}
                  />
                  <View style={styles.bottomrow}>
                    <Text style={[styles.sideStatNumber, { color: "#FF6B6B" }]}>
                      900
                    </Text>
                  <View style={styles.bottomStatLabel}>
                    <Text style={[styles.boldText, {fontSize:10}]}>TOTAL</Text>
                    <Text style={{ fontSize: 10 }}>QUESTIONS INCORRECT</Text>
                  </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Stats Row */}
            <View style={styles.bottomStatsRow}>
              <View style={styles.bottomStat}>
                <View
                  style={[styles.statLine, { backgroundColor: "#FF6B6B" }]}
                />
                <View style={styles.bottomrow}>
                  <Text style={styles.percentageText}>15%</Text>
                  <View style={styles.bottomStatLabel}>
                    <Text style={styles.boldText}>CUMULATIVE</Text>
                    <Text style={{ fontSize: 12 }}>PERCENTAGE</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomStat}>
                <View
                  style={[styles.statLine, { backgroundColor: "#FF6B6B" }]}
                />
                <View style={styles.bottomrow}>
                  <Text style={styles.pointsText}>15</Text>
                  <View style={styles.bottomStatLabel}>
                    <Text style={styles.boldText}>BB</Text>
                    <Text style={{ fontSize: 12 }}>
                      POINTS EARNED LAST QUIZ
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Time Stats Row */}
            <View style={styles.timeStatsRow}>
              <View style={styles.timeStat}>
                <View style={styles.timeCircle}>
                  <Text style={styles.timeNumber}>30</Text>
                  <Text style={styles.timeUnit}>sec</Text>
                </View>
                <Text style={styles.timeLabel}>AVERAGE{"\n"}TIME/QUESTION</Text>
              </View>
              <View style={styles.timeStat}>
                <View style={styles.timeCircle}>
                  <Text style={styles.timeNumber}>20</Text>
                  <Text style={styles.timeUnit}>min</Text>
                </View>
                <Text style={styles.timeLabel}>AVERAGE{"\n"}TIME/QUIZ</Text>
              </View>
            </View>
          </View>

          {/* Second Section - Question Details */}
          <View style={styles.questionSection}>
            <View style={styles.questionHeader}>
              <View style={[styles.statLine, { backgroundColor: "#FF6B6B" }]} />
              <View style={styles.bottomrow}>
                <Text style={styles.questionNumber}>1500</Text>
                <View style={styles.questionTitle}>
                  <Text style={styles.boldText}>TOTAL</Text>
                  <Text style={{ fontSize: 12 }}>UNUSED QUESTION</Text>
                </View>
              </View>
            </View>

            {/* Category Dropdown */}
            <View style={styles.dropdownpart}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={handleCategoryPress}
              >
                <Text style={styles.dropdownText}>CATEGORY</Text>
                <Ionicons
                  name="triangle-outline"
                  size={12}
                  color="#4864AC"
                  style={{ marginTop: 2, transform: [{ rotate: "180deg" }] }}
                />
              </TouchableOpacity>

              <View style={styles.percentageRow}>
                <Text style={styles.percentageLabel}>PERCENTAGE</Text>
                <Text style={styles.percentageValue}>65%</Text>
                <Text style={styles.overallLabel}>OVERALL(I)</Text>
                <Text style={styles.overallValue}>45%</Text>
              </View>
            </View>

            {/* Timed Dropdown */}
            <View style={styles.dropdownpart}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={handleTimedPress}
              >
                <Text style={styles.dropdownText}>TIMED</Text>
                <Ionicons
                  name="triangle-outline"
                  size={12}
                  color="#4864AC"
                  style={{ marginTop: 2, transform: [{ rotate: "180deg" }] }}
                />
              </TouchableOpacity>

              <View style={styles.percentageRow}>
                <Text style={styles.percentageLabel}>PERCENTAGE</Text>
                <Text style={styles.percentageValue}>60%</Text>
                <Text style={styles.overallLabel}>OVERALL(I)</Text>
                <Text style={styles.overallValue}>60%</Text>
              </View>
            </View>

            {/* Quiz Section */}
            <View style={styles.quizHeader}>
              <View style={[styles.statLine, { backgroundColor: "#FF6B6B" }]} />
              <View style={styles.bottomrow}>
                <Text style={styles.questionNumber}>1500</Text>
                <View style={styles.questionTitle}>
                  <Text style={styles.boldText}>TOTAL</Text>
                  <Text style={{ fontSize: 12 }}>QUIZZES</Text>
                </View>
              </View>
            </View>

            {/* Quiz Mode Dropdown */}
            <View style={styles.dropdownpart}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={handleQuizModePress}
              >
                <Text style={styles.dropdownText}>QUIZ MODE</Text>
                <Ionicons
                  name="triangle-outline"
                  size={12}
                  color="#4864AC"
                  style={{ marginTop: 2, transform: [{ rotate: "180deg" }] }}
                />
              </TouchableOpacity>

              <View
                style={[
                  styles.percentageRowSingle,
                  {
                    gap: 10,
                  },
                ]}
              >
                <Text style={styles.percentageLabel}>PERCENTAGE</Text>
                <Text style={styles.percentageValue}>65%</Text>
              </View>
            </View>

            {/* Timed Quiz */}
            <View style={styles.dropdownpart}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={handleTimedPress}
              >
                <Text style={styles.dropdownText}>TIMED</Text>
                <Ionicons
                  name="triangle-outline"
                  size={12}
                  color="#4864AC"
                  style={{ marginTop: 2, transform: [{ rotate: "180deg" }] }}
                />
              </TouchableOpacity>

              <View
                style={[
                  styles.percentageRowSingle,
                  {
                    gap: 10,
                  },
                ]}
              >
                <Text style={styles.percentageLabel}>PERCENTAGE</Text>
                <Text style={styles.percentageValue}>60%</Text>
              </View>
            </View>

            {/* Review Mode */}
            <View style={styles.quizHeader}>
              <View style={[styles.statLine, { backgroundColor: "#FF6B6B" }]} />
              <View style={styles.bottomrow}>
                <View style={styles.row}>
                  <Text style={styles.questionNumber}>120</Text>
                  <Text style={styles.reviewUnit}>min</Text>
                </View>

                <View style={styles.questionTitle}>
                  <Text style={styles.boldText}>TOTAL</Text>
                  <Text style={{ fontSize: 12 }}>TIME IN REVIEW MODE</Text>
                </View>
              </View>
            </View>

            {/* Subscribe Button */}
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => router.push("/pricing")}
            >
              <Text style={styles.subscribeText}>SUBSCRIBE</Text>
            </TouchableOpacity>
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
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    letterSpacing: 1,
  },
  performanceSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  // HORIZONTAL LAYOUT - Circle and Stats side by side
  mainStatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  circularContainer: {
    alignItems: "center",
    flex: 1,
  },
  progressContent: {
    alignItems: "center",
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: "400",
    color: "#666",
  },
  // Right side stats
  sideStats: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  sideStatItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  statLine: {
    width: 3,
    height: 20,
    backgroundColor: "#4864AC",
    marginRight: 10,
  },
  sideStatNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4864AC",
    marginRight: 5,
  },
  sideStatLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
  },
  bottomStatsRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bottomStat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  bottomrow: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginRight: 5,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginRight: 5,
  },
  bottomStatLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
    gap: 2,
    flexDirection: "row",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  timeStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  timeStat: {
    alignItems: "center",
  },
  timeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#4ECDC4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  timeNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4ECDC4",
  },
  timeUnit: {
    fontSize: 10,
    color: "#4ECDC4",
  },
  timeLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  questionSection: {
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  questionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
    marginLeft: 4,
    gap: 4,
    flexDirection: "row",
  },
  dropdownpart: {
    flexDirection: "row",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "40%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    gap: 5,
    borderColor: "#4864AC",
  },
  dropdownText: {
    fontSize: 12,
    color: "#4864AC",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  percentageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  percentageRowSingle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    //width: "50%",
  },
  percentageLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
  },
  percentageValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4864AC",
  },
  overallLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
  },
  overallValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4864AC",
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  reviewSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  reviewNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginRight: 2,
  },
  reviewUnit: {
    fontSize: 12,
    color: "#FF6B6B",
    marginRight: 5,
    marginTop: 4,
  },
  reviewTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
  },
  spacer: {
    height: 40,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  activeNavItem: {
    // Active nav item styling
  },
  activeNavCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C7B7F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  activeNavText: {
    color: "#333",
    fontWeight: "500",
  },
  subscribeButton: {
    backgroundColor: "#4864AC",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -90,
  },
  subscribeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
});

export default MyPerformanceScreen;
