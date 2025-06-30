import { Ionicons } from "@expo/vector-icons";
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
                  size={120}
                  width={8}
                  fill={55}
                  tintColor="#4CAF50"
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
                  <Text style={styles.sideStatNumber}>2000</Text>
                  <Text style={styles.sideStatLabel}>
                    TOTAL QUESTIONS ATTEMPTED
                  </Text>
                </View>
                <View style={styles.sideStatItem}>
                  <View
                    style={[styles.statLine, { backgroundColor: "#4CAF50" }]}
                  />
                  <Text style={[styles.sideStatNumber, {color: "#4CAF50"}]}>1100</Text>
                  <Text style={styles.sideStatLabel}>
                    TOTAL QUESTIONS CORRECT
                  </Text>
                </View>
                <View style={styles.sideStatItem}>
                  <View
                    style={[styles.statLine, { backgroundColor: "#FF6B6B" }]}
                  />
                  <Text style={[styles.sideStatNumber, {color: "#FF6B6B"}]}>900</Text>
                  <Text style={styles.sideStatLabel}>
                    TOTAL QUESTIONS INCORRECT
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom Stats Row */}
            <View style={styles.bottomStatsRow}>
              <View style={styles.bottomStat}>
                <View
                  style={[styles.statLine, { backgroundColor: "#FF6B6B" }]}
                />
                <Text style={styles.percentageText}>15%</Text>
                <Text style={styles.bottomStatLabel}>
                  CUMULATIVE PERCENTAGE
                </Text>
              </View>
              <View style={styles.bottomStat}>
                <Text style={styles.pointsText}>15</Text>
                <Text style={styles.bottomStatLabel}>
                  BB POINTS EARNED LAST QUIZ
                </Text>
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
              <Text style={styles.questionNumber}>1500</Text>
              <Text style={styles.questionTitle}>TOTAL UNUSED QUESTION</Text>
            </View>

            {/* Category Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={handleCategoryPress}
            >
              <Text style={styles.dropdownText}>CATEGORY</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.percentageRow}>
              <Text style={styles.percentageLabel}>PERCENTAGE</Text>
              <Text style={styles.percentageValue}>65%</Text>
              <Text style={styles.overallLabel}>OVERALL(I)</Text>
              <Text style={styles.overallValue}>45%</Text>
            </View>

            {/* Timed Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={handleTimedPress}
            >
              <Text style={styles.dropdownText}>TIMED</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.percentageRow}>
              <Text style={styles.percentageLabel}>PERCENTAGE</Text>
              <Text style={styles.percentageValue}>60%</Text>
              <Text style={styles.overallLabel}>OVERALL(I)</Text>
              <Text style={styles.overallValue}>60%</Text>
            </View>

            {/* Quiz Section */}
            <View style={styles.quizHeader}>
              <View style={[styles.statLine, { backgroundColor: "#FF6B6B" }]} />
              <Text style={styles.questionNumber}>1500</Text>
              <Text style={styles.questionTitle}>TOTAL QUIZZES</Text>
            </View>

            {/* Quiz Mode Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={handleQuizModePress}
            >
              <Text style={styles.dropdownText}>QUIZ MODE</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.percentageRowSingle}>
              <Text style={styles.percentageLabel}>PERCENTAGE</Text>
              <Text style={styles.percentageValue}>65%</Text>
            </View>

            {/* Timed Quiz */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={handleTimedPress}
            >
              <Text style={styles.dropdownText}>TIMED</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <View style={styles.percentageRowSingle}>
              <Text style={styles.percentageLabel}>PERCENTAGE</Text>
              <Text style={styles.percentageValue}>60%</Text>
            </View>

            {/* Review Mode */}
            <View style={styles.reviewSection}>
              <View style={[styles.statLine, { backgroundColor: "#FF6B6B" }]} />
              <Text style={styles.reviewNumber}>120</Text>
              <Text style={styles.reviewUnit}>min</Text>
              <Text style={styles.reviewTitle}>TOTAL TIME IN REVIEW MODE</Text>
            </View>

            {/* Subscribe Button */}
            {isSubscribed && (
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={() => router.push("/pricing")}
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
    paddingLeft: 20,
    justifyContent: "center",
  },
  sideStatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  bottomStat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginLeft: 10,
    marginRight: 5,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 5,
  },
  bottomStatLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
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
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  timeNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  timeUnit: {
    fontSize: 10,
    color: "#4CAF50",
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
    marginRight: 5,
  },
  questionTitle: {
    fontSize: 12,
    color: "#666",
    letterSpacing: 0.5,
    flex: 1,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  dropdownText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  percentageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  percentageRowSingle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "50%",
  },
  percentageLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
  },
  percentageValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A90E2",
  },
  overallLabel: {
    fontSize: 10,
    color: "#666",
    letterSpacing: 0.5,
  },
  overallValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A90E2",
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
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
});

export default MyPerformanceScreen;
