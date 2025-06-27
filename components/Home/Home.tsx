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

  const handleNavPress = (id: string) => {
    console.log(`Navigating to: ${id}`);
    // Handle navigation here
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
    console.log("My performance pressed");
    router.push("/quiz");
  };

  const handleMyPerformance = () => {
    console.log("My performance pressed");
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

          {/* Main Progress Circle */}
          <View style={styles.progressview}>
            <View style={styles.progressSection}>
              <CircularProgressComponent
                size={180}
                width={10}
                fill={progressFill}
                centerText={stats.total.toString()}
                centerSubText="QUESTIONS"
                tintColor={Colors.primary}
                backgroundColor={Colors.secondary}
              />
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.statDivider} />
                <Text
                  style={[styles.statPercentage, { color: Colors.success }]}
                >
                  {stats.correct}({correctPercentage}%)
                </Text>
                <Text style={styles.statLabel}>CORRECT QUESTIONS</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={[styles.statPercentage, { color: Colors.error }]}>
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

          {/* Bottom Stats Cards */}
          <View style={styles.bottomStatsContainer}>
            <StatCard
              percentage={`${correctPercentage}%`}
              label="CUMULATIVE"
              sublabel="PERCENTAGE"
              color={Colors.text.light}
            />
            <StatCard
              percentage={`${stats.correct}/${stats.total}`}
              label="SUBJECT"
              sublabel="WISE COUNT"
              color={Colors.text.light}
            />
            <StatCard
              percentage={stats.correct.toString()}
              label="TOTAL"
              sublabel="CORRECT ANSWER"
              color={Colors.text.light}
            />
          </View>

          <View style={styles.iconGrid}>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.cell,
                  styles.centerBorderRight,
                  styles.centerBorderBottom,
                ]}
                onPress={handleMyQuiz}
              >
                <Feather name="send" size={28} color="#3257a8" />
                <Text style={styles.cellLabel}>QUIZ ME</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cell, styles.centerBorderBottom]}
                onPress={handleSubmitQuestion}
              >
                <Feather name="upload-cloud" size={28} color="#3257a8" />
                <Text style={styles.cellLabel}>SUBMIT A QUESTION</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.cell, styles.centerBorderRight]}
                onPress={handleMyPerformance}
              >
                <Feather name="pie-chart" size={28} color="#3257a8" />
                <Text style={styles.cellLabel}>MY PERFORMANCE</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cell} onPress={handleExplore}>
                <Ionicons name="bulb-outline" size={28} color="#3257a8" />
                <Text style={styles.cellLabel}>BB EXPLORE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation onNavPress={handleNavPress} />
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
