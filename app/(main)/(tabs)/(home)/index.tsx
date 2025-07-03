import { styles } from "@/components/Home/Home.styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

// Types
interface QuestionStats {
  total: number;
  correct: number;
  incorrect: number;
}


const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState<QuestionStats>({
    total: 2300,
    correct: 1300,
    incorrect: 1000,
  });
  
  const correctPercentage =
  stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const incorrectPercentage =
  stats.total > 0 ? Math.round((stats.incorrect / stats.total) * 100) : 0;
  
  // Individual stat values
  const cumulativePercentage = 90;
  const subjectWisePercentage = 75;
  const recentGainsPercentage = 35;
  
  const handleNavPress = (id: string) => {
    console.log(`Navigating to: ${id}`);
  };
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        router.push("/login");
      }
    };
  
    checkToken();
  }, []);
  
  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleSubmitQuestion = () => {
    console.log("Submit question pressed");
    router.push("/question");
  };

  const handleMyQuiz = () => {
    console.log("Quiz me pressed");
    router.push("/quiz");
  };

  const handleMyPerformance = () => {
    console.log("My performance pressed");
    router.navigate("/performance");
  };

  const handleExplore = () => {
    console.log("Explore pressed");
    router.push("/bbexplore");
  };

  const handleViewMore = () => {
    console.log("View more pressed");
  };

  // Circular Progress Component Logic
  const renderMainCircularProgress = () => {
    const size = 180;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const correctStrokeDasharray = (correctPercentage / 100) * circumference;
    const incorrectStrokeDasharray =
      (incorrectPercentage / 100) * circumference;

    return (
      <View style={[styles.mainCircleContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Correct answers arc (teal) */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4ECDC4"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${correctStrokeDasharray} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          {/* Incorrect answers arc (coral) */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FF6B6B"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${incorrectStrokeDasharray} ${circumference}`}
            strokeDashoffset={-correctStrokeDasharray}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* Center text */}
        <View style={styles.mainCircleCenterText}>
          <Text style={styles.mainCircleNumber}>{stats.total}</Text>
          <Text style={styles.mainCircleLabel}>QUESTIONS</Text>
        </View>
      </View>
    );
  };

  // Small Stat Circle Component Logic
  const renderStatCircle = (
    percentage: number,
    label: string,
    color: string
  ) => {
    const size = 70;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = (percentage / 100) * circumference;

    return (
      <View style={styles.statCircleContainer}>
        <View style={[styles.statCircle, { width: size, height: size }]}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#f0f0f0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Progress circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${strokeDasharray} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>

          {/* Center percentage */}
          <View style={styles.statCircleCenterText}>
            <Text style={[styles.statCirclePercentage, { color }]}>
              {percentage}%
            </Text>
          </View>
        </View>

        {/* Label */}
        <Text style={styles.statCircleLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Home Label */}
          <View style={styles.homeSection}>
            <Text style={styles.homeLabel}>HOME</Text>
          </View>

          {/* Main Progress Circle */}
          <View style={styles.progressSection}>
            {renderMainCircularProgress()}
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, styles.correctStat]}>
                  {stats.correct}({correctPercentage}%)
                </Text>
                <Text style={styles.statLabel}>CORRECT QUESTIONS</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, styles.incorrectStat]}>
                  {stats.incorrect}({incorrectPercentage}%)
                </Text>
                <Text style={styles.statLabel}>INCORRECT QUESTIONS</Text>
              </View>
            </View>
          </View>

          {/* View More Button */}
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={handleViewMore}
          >
            <Text style={styles.viewMoreText}>VIEW MORE</Text>
          </TouchableOpacity>

          {/* Stat Circles */}
          <View style={styles.statCirclesContainer}>
            {renderStatCircle(
              cumulativePercentage,
              "CUMULATIVE\nPERCENTAGE",
              "#4ECDC4"
            )}
            {renderStatCircle(
              subjectWisePercentage,
              "SUBJECT\nWISE COUNT",
              "#FFB84D"
            )}
            {renderStatCircle(
              recentGainsPercentage,
              "RECENT\nGAINS",
              "#4ECDC4"
            )}
          </View>

          {/* Action Buttons Grid */}
          <View style={styles.actionButtonsContainer}>
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.actionButtonBorderRight,
                  styles.actionButtonBorderBottom,
                ]}
                onPress={handleMyQuiz}
              >
                <View style={styles.actionButtonIcon}>
                  <Feather name="send" size={28} color="#4864AC" />
                </View>
                <Text style={styles.actionButtonLabel}>QUIZ ME</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonBorderBottom]}
                onPress={handleSubmitQuestion}
              >
                <View style={styles.actionButtonIcon}>
                  <Feather name="upload-cloud" size={28} color="#4864AC" />
                </View>
                <Text style={styles.actionButtonLabel}>SUBMIT A QUESTION</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonBorderRight]}
                onPress={handleMyPerformance}
              >
                <View style={styles.actionButtonIcon}>
                  <Feather name="pie-chart" size={28} color="#4864AC" />
                </View>
                <Text style={styles.actionButtonLabel}>MY PERFORMANCE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleExplore}
              >
                <View style={styles.actionButtonIcon}>
                  <Ionicons name="bulb-outline" size={28} color="#4864AC" />
                </View>
                <Text style={styles.actionButtonLabel}>BB EXPLORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
