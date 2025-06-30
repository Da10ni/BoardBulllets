import CircularProgressComponent from "@/components/CircularProgress/Circular";
import StatCard from "@/components/StatCard/StatCard";
import BottomNavigation from "@/components/ui/BottomNavigation";
import { Colors } from "@/constants/Colors";
import { QuestionStats } from "@/utils/type";
import { Feather, Ionicons } from "@expo/vector-icons";
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
import Header from "../Header/Header";
import { styles } from "./Home.styles";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState<QuestionStats>({
    total: 100,
    correct: 30,
    incorrect: 0,
  });

  const [progressFill, setProgressFill] = useState(50);

  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => {
      setProgressFill(
        stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [stats]);

  const correctPercentage =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const incorrectPercentage =
    stats.total > 0 ? Math.round((stats.incorrect / stats.total) * 100) : 0;

  // Fix: Generic string type instead of specific union type
  const handleNavPress = (id: string) => {
    // Type assertion ya conditional routing
    switch(id) {
      case '/(drawer)':
        router.push('/(drawer)');
        break;
      case '/questionsScreen':
        router.push('/questionsScreen');
        break;
      case '/quiz':
        router.push('/quiz');
        break;
      case '/bbExplore':
        router.push('/bbExplore');
        break;
      default:
        console.log(`Unknown route: ${id}`);
    }
  };

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ safe
  };
  
  const handleMorePress = () => {
    console.log("More pressed");
  };

  const handleSubmitQuestion = () => {
    console.log("Submit question pressed");
    router.push("/questionsScreen");
  };
  
  const handleMyQuiz = () => {
    console.log("My quiz pressed");
    router.push("/quiz");
  };

  const handleMyPerformance = () => {
    console.log("My performance pressed");
    router.push("/performance");
  };

  const handleExplore = () => {
    console.log("Explore pressed");
    router.push("/bbExplore");
  };

  const handleViewMore = () => {
    console.log("View more pressed");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header />

          {/* Home Label */}
          <View style={styles.homeSection}>
            <Text style={styles.homeLabel}>HOME</Text>
          </View>

          {/* Progress and Stats Combined Section */}
          <View style={styles.progressAndStatsSection}>
            {/* Main Progress Circle */}
            <View style={styles.progressSection}>
              <View style={styles.mainCircleContainer}>
                <CircularProgressComponent
                  size={180}
                  strokeWidth={10}
                  correctPercentage={correctPercentage}
                  incorrectPercentage={incorrectPercentage}
                  centerText={stats.total.toString()}
                  centerSubText="QUESTIONS"
                />
              </View>
            </View>

            {/* Stats Container */}
            <View style={styles.statsContainer}>
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

          {/* Stat Circles Container */}
          <View style={styles.statCirclesContainer}>
            <View style={styles.statCircleContainer}>
              <View style={styles.statCircle}>
                <Text style={[styles.statCirclePercentage, { color: Colors.primary }]}>
                  {correctPercentage}%
                </Text>
              </View>
              <Text style={styles.statCircleLabel}>CUMULATIVE{"\n"}PERCENTAGE</Text>
            </View>

            <View style={styles.statCircleContainer}>
              <View style={styles.statCircle}>
                <Text style={[styles.statCirclePercentage, { color: Colors.primary }]}>
                  {stats.correct}/{stats.total}
                </Text>
              </View>
              <Text style={styles.statCircleLabel}>SUBJECT{"\n"}WISE COUNT</Text>
            </View>

            <View style={styles.statCircleContainer}>
              <View style={styles.statCircle}>
                <Text style={[styles.statCirclePercentage, { color: Colors.primary }]}>
                  {stats.correct}
                </Text>
              </View>
              <Text style={styles.statCircleLabel}>TOTAL{"\n"}CORRECT ANSWER</Text>
            </View>
          </View>

          {/* Action Buttons */}
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
                  <Feather name="send" size={28} color="#3257a8" />
                </View>
                <Text style={styles.actionButtonLabel}>QUIZ ME</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.actionButtonBorderBottom,
                ]}
                onPress={handleSubmitQuestion}
              >
                <View style={styles.actionButtonIcon}>
                  <Feather name="upload-cloud" size={28} color="#3257a8" />
                </View>
                <Text style={styles.actionButtonLabel}>SUBMIT A QUESTION</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.actionButtonBorderRight,
                ]}
                onPress={handleMyPerformance}
              >
                <View style={styles.actionButtonIcon}>
                  <Feather name="pie-chart" size={28} color="#3257a8" />
                </View>
                <Text style={styles.actionButtonLabel}>MY PERFORMANCE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleExplore}
              >
                <View style={styles.actionButtonIcon}>
                  <Ionicons name="bulb-outline" size={28} color="#3257a8" />
                </View>
                <Text style={styles.actionButtonLabel}>BB EXPLORE</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation onNavPress={handleNavPress} />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;