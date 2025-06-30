import Header from "@/components/Header/Header";
import { styles } from "@/components/QuizMe/QuizFlow.styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const { width } = Dimensions.get("window");

// Sample quiz data
const QUIZ_DATA = [
  {
    id: 1,
    question: "NERVE INJURED WITH A MEDIAL EPICONDYLE FRACTURE?",
    options: ["MEDIAN NERVE", "RADIAL NERVE", "ULNAR NERVE"],
    correctAnswer: 2, // index of correct answer
  },
  {
    id: 2,
    question: "WHICH BONE IS THE LONGEST IN THE HUMAN BODY?",
    options: ["TIBIA", "FEMUR", "HUMERUS", "RADIUS"],
    correctAnswer: 1,
  },
  // Add more questions as needed
];

export default function QuizFlow() {
  const [currentScreen, setCurrentScreen] = useState("timer");
  const [selectedTime, setSelectedTime] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | null }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const timeOptions = [5, 10, 20];
  const currentQuestion = QUIZ_DATA[currentQuestionIndex];
  const totalQuestions = QUIZ_DATA.length;

  const completedAnim = useRef<any>(null);
  const incorrectAnim = useRef<any>(null);
  const pointsAnim = useRef<any>(null);
  const rankAnim = useRef<any>(null);

  // Timer countdown effect
  useEffect(() => {
    let interval: number;
    if (quizStarted && timeRemaining > 0 && currentScreen === "question") {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeRemaining, currentScreen]);

  const handleNavPress = (id: string) => {
    console.log(`Navigating to: ${id}`);
  };

  const handleStartQuiz = () => {
    setTimeRemaining(selectedTime * 60); // Convert minutes to seconds
    setQuizStarted(true);
    setCurrentScreen("question");
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Save the answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));

    setSelectedAnswer(null);
    setShowCorrectAnswer(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz completed
      setCurrentScreen("summary");
    }
  };

  const handleTimeUp = () => {
    setCurrentScreen("summary");
    setQuizStarted(false);
  };

  const handleReviewQuiz = () => {
    setCurrentScreen("results");
    setCurrentQuestionIndex(0);
    setShowCorrectAnswer(true);
  };

  const handleBackToHome = () => {
    setCurrentScreen("timer");
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setQuizStarted(false);
    setShowCorrectAnswer(false);
  };

  const handleClose = () => {
    router.push("/(drawer)");
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_DATA.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const renderTimerScreen = () => (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.timerSection}>
        <View style={styles.iconsRow}>
          <View style={styles.iconContainer}>
            <Feather name="shuffle" size={24} color="#ADB5BD" />
          </View>
          <View style={[styles.iconContainer, styles.activeIconContainer]}>
            <Ionicons name="timer-outline" size={24} color="#3257a8" />
          </View>
          <View style={styles.iconContainer}>
            <Feather name="file-text" size={24} color="#ADB5BD" />
          </View>
        </View>

        <Text style={styles.timedLabel}>TIMED</Text>

        <View style={styles.timeOptionsContainer}>
          {timeOptions.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                selectedTime === time && styles.selectedTimeOption,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.startQuizButton}
          onPress={handleStartQuiz}
        >
          <Text style={styles.startQuizButtonText}>START QUIZ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderQuestionScreen = () => (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <View style={styles.timerDisplay}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          </View>
          <Text style={styles.questionCounter}>
            QUESTION {currentQuestionIndex + 1}
          </Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Ionicons name="menu" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressDots}>
          {QUIZ_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentQuestionIndex && styles.completedDot,
                index === currentQuestionIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
        
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                showCorrectAnswer &&
                  index === currentQuestion.correctAnswer &&
                  styles.correctOption,
                showCorrectAnswer &&
                  selectedAnswer === index &&
                  selectedAnswer !== currentQuestion.correctAnswer &&
                  styles.incorrectOption,
              ]}
              onPress={() => !showCorrectAnswer && handleAnswerSelect(index)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Next Button - Now in scrollable area */}
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedAnswer === null && styles.disabledButton,
            ]}
            onPress={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex === totalQuestions - 1
                ? "FINISH QUIZ"
                : "NEXT QUESTION"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{ backgroundColor: "white", borderRadius: 12, padding: 20 }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              Jump to Question
            </Text>
            <FlatList
              data={QUIZ_DATA}
              keyExtractor={(item) => item.id.toString()}
              numColumns={5}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentQuestionIndex(index);
                    setIsModalVisible(false);
                  }}
                  style={{
                    margin: 5,
                    backgroundColor:
                      index < currentQuestionIndex ? "#4864AC" : "#E0E0E0",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: index < currentQuestionIndex ? "white" : "black",
                    }}
                  >
                    {item.id}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.close}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ marginTop: 20, alignSelf: "flex-end" }}
              >
                <Text style={{ color: "#3257a8" }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleClose()}
                style={{ marginTop: 20, alignSelf: "flex-end" }}
              >
                <Text style={{ color: "#3257a8" }}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderCircle = (
    label: string, 
    value: string | number, 
    ref: React.RefObject<any>, 
    color: string
  ) => (
    <View style={{ alignItems: "center", margin: 10 }}>
      <AnimatedCircularProgress
        ref={ref}
        size={100}
        width={10}
        fill={0}
        tintColor={color}
        backgroundColor="#E0E0E0"
        duration={1000}
      >
        {() => (
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{value}</Text>
        )}
      </AnimatedCircularProgress>
      <Text style={{ marginTop: 5, fontWeight: "600" }}>{label}</Text>
    </View>
  );

  useEffect(() => {
    if (currentScreen === "summary") {
      const score = calculateScore();
      const incorrect = score.total - score.correct;
      const points = score.correct * 10;
      const rank = score.correct >= 2 ? "Expert" : "Beginner";

      completedAnim.current?.animate(score.correct * (100 / score.total));
      incorrectAnim.current?.animate(incorrect * (100 / score.total));
      pointsAnim.current?.animate(points % 100);
      rankAnim.current?.animate(rank === "Expert" ? 100 : 50);
    }
  }, [currentScreen]);

  const renderSummaryScreen = () => {
    const score = calculateScore();
    const incorrect = score.total - score.correct;
    const points = score.correct * 10;
    const rank = "25th";

    const renderCircle = (
      label: string,
      value: string | number,
      ref: any,
      color: string
    ) => {
      return (
        <View style={summaryStyles.circleContainer}>
          <AnimatedCircularProgress
            ref={ref}
            size={90}
            width={8}
            fill={65}
            tintColor={color}
            backgroundColor="#E5E5E5"
            duration={1000}
          >
            {() => (
              <View style={summaryStyles.circleContent}>
                <Text style={[summaryStyles.circleValue, { color }]}>
                  {value}
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={summaryStyles.circleLabel}>{label}</Text>
        </View>
      );
    };

    const renderReviewDot = (index: number, isCorrect: boolean | null) => {
      let backgroundColor = "#E5E5E5"; // Gray for unanswered
      if (isCorrect === true) backgroundColor = "#4CAF50"; // Green for correct
      if (isCorrect === false) backgroundColor = "#F44336"; // Red for incorrect

      return (
        <View
          key={index}
          style={[summaryStyles.reviewDot, { backgroundColor }]}
        >
          <Text style={summaryStyles.reviewDotText}>{index + 1}</Text>
        </View>
      );
    };

    // Question answers pattern from image
    const questionAnswers = [
      // Row 1: 1-10
      true, false, true, true, false, false, null, true, false, true,
      // Row 2: 11-20
      null, false, true, true, null, false, false, true, true, true,
    ];

    return (
      <ScrollView
        contentContainerStyle={summaryStyles.container}
        showsVerticalScrollIndicator={false}
        style={summaryStyles.scrollContainer}
      >
        {/* Header with Arrow */}
        <View style={summaryStyles.header}>
          <TouchableOpacity style={summaryStyles.backArrow}>
            <Text style={summaryStyles.arrowText}>←</Text>
          </TouchableOpacity>
          <Text style={summaryStyles.headerTitle}>QUIZ SUMMARY</Text>
          <TouchableOpacity style={summaryStyles.downArrow}>
            <Text style={summaryStyles.arrowText}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* Circles Grid - Exactly like image */}
        <View style={summaryStyles.circlesGrid}>
          {/* Top Row */}
          <View style={summaryStyles.circlesRow}>
            {renderCircle("RAW\nSCORE", "10/20", completedAnim, "#FFB84D")}
            {renderCircle("QUIZ\nBB POINTS", "92", pointsAnim, "#4A90E2")}
          </View>

          {/* Bottom Row */}
          <View style={summaryStyles.circlesRow}>
            {renderCircle("OVERALL\nRANK", rank, rankAnim, "#4CAF50")}
            {renderCircle(
              "INCORRECT\nQUESTION",
              "07",
              incorrectAnim,
              "#F44336"
            )}
          </View>
        </View>

        {/* Review Quiz Section */}
        <View style={summaryStyles.reviewSection}>
          <Text style={summaryStyles.reviewTitle}>REVIEW QUIZ</Text>

          {/* Question Dots Grid */}
          <View style={summaryStyles.dotsContainer}>
            {/* Row 1: Questions 1-10 */}
            <View style={summaryStyles.dotsRow}>
              {questionAnswers
                .slice(0, 10)
                .map((isCorrect, i) => renderReviewDot(i, isCorrect))}
            </View>

            {/* Row 2: Questions 11-20 */}
            <View style={summaryStyles.dotsRow}>
              {questionAnswers
                .slice(10, 20)
                .map((isCorrect, i) => renderReviewDot(i + 10, isCorrect))}
            </View>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          onPress={handleBackToHome}
          style={summaryStyles.backButton}
        >
          <Text style={summaryStyles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderResultsScreen = () => {
    const currentAnswer = userAnswers[currentQuestion.id];
    const isCorrect = currentAnswer === currentQuestion.correctAnswer;

    return (
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.questionCounter}>
              QUESTION {currentQuestionIndex + 1}
            </Text>
            <Text
              style={[
                styles.resultStatus,
                isCorrect ? styles.correct : styles.incorrect,
              ]}
            >
              {isCorrect ? "CORRECT" : "INCORRECT"}
            </Text>
          </View>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <View
                key={index}
                style={[
                  styles.resultOption,
                  index === currentQuestion.correctAnswer &&
                    styles.correctResultOption,
                  currentAnswer === index &&
                    currentAnswer !== currentQuestion.correctAnswer &&
                    styles.incorrectResultOption,
                ]}
              >
                <Text
                  style={[
                    styles.resultOptionText,
                    index === currentQuestion.correctAnswer &&
                      styles.correctResultText,
                  ]}
                >
                  {option}
                </Text>
                {index === currentQuestion.correctAnswer && (
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                )}
                {currentAnswer === index &&
                  currentAnswer !== currentQuestion.correctAnswer && (
                    <Ionicons name="close-circle" size={20} color="#F44336" />
                  )}
              </View>
            ))}
          </View>

          <View style={styles.navigationButtons}>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                <Ionicons name="chevron-back" size={20} color="#3257a8" />
                <Text style={styles.navButtonText}>PREVIOUS</Text>
              </TouchableOpacity>
            )}

            {currentQuestionIndex < totalQuestions - 1 ? (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentQuestionIndex((prev) => prev + 1)}
              >
                <Text style={styles.navButtonText}>NEXT</Text>
                <Ionicons name="chevron-forward" size={20} color="#3257a8" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleBackToHome}
              >
                <Text style={styles.finishButtonText}>FINISH REVIEW</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

  // Summary Styles
  const summaryStyles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    container: {
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 20,
      minHeight: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 30,
    },
    backArrow: {
      padding: 10,
    },
    downArrow: {
      padding: 10,
    },
    arrowText: {
      fontSize: 24,
      color: "#333",
      fontWeight: "bold",
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "400",
      color: "#666",
      letterSpacing: 1,
    },
    circlesGrid: {
      width: "90%",
      marginBottom: 40,
    },
    circlesRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: 10,
    },
    circleContainer: {
      alignItems: "center",
      marginHorizontal: 20,
    },
    circleContent: {
      alignItems: "center",
      justifyContent: "center",
    },
    circleValue: {
      fontSize: 16,
      fontWeight: "600",
    },
    circleLabel: {
      fontSize: 10,
      color: "#666",
      textAlign: "center",
      marginTop: 15,
      letterSpacing: 0.5,
      lineHeight: 12,
    },
    reviewSection: {
      width: "100%",
      alignItems: "center",
      marginBottom: 30,
    },
    reviewTitle: {
      fontSize: 14,
      fontWeight: "400",
      color: "#4A90E2",
      marginBottom: 25,
      letterSpacing: 1,
    },
    dotsContainer: {
      alignItems: "center",
    },
    dotsRow: {
      flexDirection: "row",
      marginBottom: 15,
      justifyContent: "center",
    },
    reviewDot: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#E5E5E5",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    },
    reviewDotText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#fff",
    },
    backButton: {
      marginTop: 20,
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    backButtonText: {
      color: "#4A90E2",
      fontSize: 14,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Home Section - Fixed at top */}
      <View style={styles.homeSection}>
        <Text style={styles.homeLabel}>
          {currentScreen === "timer" && "QUIZ ME"}
          {currentScreen === "question" && "QUIZ IN PROGRESS"}
          {currentScreen === "summary" && "QUIZ COMPLETE"}
          {currentScreen === "results" && "QUIZ REVIEW"}
        </Text>
      </View>

      {/* Scrollable Content Based on Screen */}
      {currentScreen === "timer" && renderTimerScreen()}
      {currentScreen === "question" && renderQuestionScreen()}
      {currentScreen === "summary" && renderSummaryScreen()}
      {currentScreen === "results" && renderResultsScreen()}

      {/* <BottomNavigation onNavPress={handleNavPress} /> */}
    </SafeAreaView>
  );
}