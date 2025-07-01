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
    explanation:
      "The ulnar nerve passes posterior to the medial epicondyle and is commonly injured with fractures in this area.",
    difficulty: "VERY GOOD",
    popularity: "VERY HIGH",
  },
  {
    id: 2,
    question: "WHICH BONE IS THE LONGEST IN THE HUMAN BODY?",
    options: ["TIBIA", "FEMUR", "HUMERUS", "RADIUS"],
    correctAnswer: 1,
    explanation:
      "The femur (thigh bone) is the longest and strongest bone in the human body.",
    difficulty: "EASY",
    popularity: "HIGH",
  },
  {
    id: 3,
    question: "WHAT IS THE SMALLEST BONE IN THE HUMAN BODY?",
    options: ["STAPES", "MALLEUS", "INCUS", "HYOID"],
    correctAnswer: 0,
    explanation:
      "The stapes (stirrup bone) in the middle ear is the smallest bone in the human body.",
    difficulty: "MEDIUM",
    popularity: "MEDIUM",
  },
  // Add more questions to get to 20
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 4,
    question: `SAMPLE QUESTION ${i + 4}?`,
    options: ["OPTION A", "OPTION B", "OPTION C", "OPTION D"],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `This is the explanation for question ${i + 4}.`,
    difficulty: ["EASY", "MEDIUM", "HARD", "VERY GOOD"][
      Math.floor(Math.random() * 4)
    ],
    popularity: ["LOW", "MEDIUM", "HIGH", "VERY HIGH"][
      Math.floor(Math.random() * 4)
    ],
  })),
];

export default function QuizFlow() {
  const [currentScreen, setCurrentScreen] = useState("timer");
  const [selectedTime, setSelectedTime] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0); // For feedback screen
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackOptions, setFeedbackOptions] = useState({
    spelling: false,
    grammar: false,
    content: false,
    other: false,
  });
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

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz completed - go directly to summary
      setCurrentScreen("summary");
    }
  };

  const handleTimeUp = () => {
    setCurrentScreen("summary");
    setQuizStarted(false);
  };

  const handleQuestionReview = (questionIndex: number) => {
    setReviewQuestionIndex(questionIndex);
    setCurrentScreen("feedback");
  };

  const handleBackToSummary = () => {
    setCurrentScreen("summary");
  };

  
  const handleBackToHome = () => {
    setCurrentScreen("timer");
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setQuizStarted(false);
  };

  const handleClose = () => {
    router.push("/(drawer)");
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let notAttempted = 0;

    QUIZ_DATA.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === undefined || userAnswer === null) {
        notAttempted++;
      } else if (userAnswer === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return {
      correct,
      incorrect,
      notAttempted,
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
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
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
              ]}
              onPress={() => handleAnswerSelect(index)}
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

        {/* Next Button */}
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

 // Feedback Screen UI Redesign (Simplified like image)

const renderFeedbackScreen = () => {
  const reviewQuestion = QUIZ_DATA[reviewQuestionIndex];
  const userAnswer = userAnswers[reviewQuestion.id];
  const isCorrect = userAnswer === reviewQuestion.correctAnswer;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={flatFeedbackStyles.container}>
        {/* Header Row */}
        <View style={flatFeedbackStyles.headerRow}>
          <Text style={flatFeedbackStyles.timerText}>00:25</Text>
          <Text style={isCorrect ? flatFeedbackStyles.correct : flatFeedbackStyles.incorrect}>
            {isCorrect ? "CORRECT" : "INCORRECT"}
          </Text>
        </View>

        <Text style={flatFeedbackStyles.questionNumber}>QUESTION {reviewQuestionIndex + 1}</Text>
        <Text style={flatFeedbackStyles.questionText}>{reviewQuestion.question}</Text>

        {reviewQuestion.options.map((opt, idx) => {
          const selected = userAnswer === idx;
          const correct = reviewQuestion.correctAnswer === idx;
          let style = flatFeedbackStyles.optionButton;

          if (correct) style = flatFeedbackStyles.correctOption;
          else if (selected && !correct) style = flatFeedbackStyles.incorrectOption;

          return (
            <View key={idx} style={style}>
              <Text
                style={
                  correct
                    ? flatFeedbackStyles.optionTextCorrect
                    : selected
                    ? flatFeedbackStyles.optionTextIncorrect
                    : flatFeedbackStyles.optionText
                }
              >
                {opt}
              </Text>
            </View>
          );
        })}

        <View style={flatFeedbackStyles.sliderRow}>
          <Text style={flatFeedbackStyles.sliderLabel}>QUALITY</Text>
          <View style={flatFeedbackStyles.sliderTrack}>
            <View style={[flatFeedbackStyles.sliderFill, { width: '60%' }]} />
          </View>
          <Text style={flatFeedbackStyles.sliderValue}>{reviewQuestion.popularity}</Text>
        </View>

        <View style={flatFeedbackStyles.sliderRow}>
          <Text style={flatFeedbackStyles.sliderLabel}>DIFFICULTY</Text>
          <View style={flatFeedbackStyles.sliderTrack}>
            <View style={[flatFeedbackStyles.sliderFill, { width: '50%' }]} />
          </View>
          <Text style={flatFeedbackStyles.sliderValue}>{reviewQuestion.difficulty}</Text>
        </View>

        <View style={flatFeedbackStyles.dotsRow}>
          {QUIZ_DATA.map((_, idx) => {
            const ans = userAnswers[QUIZ_DATA[idx].id];
            let bg = "#BDBDBD";
            if (ans === QUIZ_DATA[idx].correctAnswer) bg = "#4CAF50";
            else if (ans !== null && ans !== undefined) bg = "#F44336";

            return (
              <TouchableOpacity
                key={idx}
                style={[flatFeedbackStyles.dot, { backgroundColor: bg }]}
                onPress={() => setReviewQuestionIndex(idx)}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={flatFeedbackStyles.feedbackButton}
          onPress={() => setCurrentScreen("summary")}
        >
          <Text style={flatFeedbackStyles.feedbackButtonText}>BACK TO SUMMARY</Text>
        </TouchableOpacity>

        <Text style={flatFeedbackStyles.footer}>BOARDBULLET</Text>
      </View>
    </ScrollView>
  );
};



  const renderSummaryScreen = () => {
    const score = calculateScore();
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

    const renderReviewDot = (index: number) => {
      const question = QUIZ_DATA[index];
      const userAnswer = userAnswers[question.id];
      let backgroundColor = "#E5E5E5"; // Gray for unanswered

      if (userAnswer === null || userAnswer === undefined) {
        backgroundColor = "#E5E5E5"; // Gray for not attempted
      } else if (userAnswer === question.correctAnswer) {
        backgroundColor = "#4CAF50"; // Green for correct
      } else {
        backgroundColor = "#F44336"; // Red for incorrect
      }

      return (
        <TouchableOpacity
          key={index}
          style={[summaryStyles.reviewDot, { backgroundColor }]}
          onPress={() => handleQuestionReview(index)}
        >
          <Text style={summaryStyles.reviewDotText}>{index + 1}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView
        contentContainerStyle={summaryStyles.container}
        showsVerticalScrollIndicator={false}
        style={summaryStyles.scrollContainer}
      >
        {/* Header */}
        <View style={summaryStyles.header}>
          <Text style={summaryStyles.headerTitle}>QUIZ SUMMARY</Text>
        </View>

        {/* Circles Grid */}
        <View style={summaryStyles.circlesGrid}>
          {/* Top Row */}
          <View style={summaryStyles.circlesRow}>
            {renderCircle(
              "RAW\nSCORE",
              `${score.correct}/${score.total}`,
              completedAnim,
              "#FFB84D"
            )}
            {renderCircle("QUIZ\nBB POINTS", "92", pointsAnim, "#4A90E2")}
          </View>

          {/* Bottom Row */}
          <View style={summaryStyles.circlesRow}>
            {renderCircle("OVERALL\nRANK", rank, rankAnim, "#4CAF50")}
            {renderCircle(
              "INCORRECT\nQUESTION",
              score.incorrect.toString().padStart(2, "0"),
              incorrectAnim,
              "#F44336"
            )}
          </View>
        </View>

        {/* Review Quiz Section */}
        <View style={summaryStyles.reviewSection}>
          <Text style={summaryStyles.reviewTitle}>REVIEW QUIZ</Text>
          <Text style={summaryStyles.reviewSubtitle}>
            Correct: {score.correct} | Incorrect: {score.incorrect} | Not
            Attempted: {score.notAttempted}
          </Text>

          {/* Question Dots Grid - Click any to see feedback */}
          <View style={summaryStyles.dotsContainer}>
            <View style={summaryStyles.dotsRow}>
              {QUIZ_DATA.map((_, index) => renderReviewDot(index))}
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
  const flatFeedbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timerText: {
    fontSize: 16,
    color: '#999',
  },
  correct: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  incorrect: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  correctOption: {
    backgroundColor: '#e6f4ea',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#fbeaea',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  optionTextCorrect: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  optionTextIncorrect: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sliderLabel: {
    width: 80,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginHorizontal: 8,
  },
  sliderFill: {
    height: 6,
    backgroundColor: '#33c37e',
    borderRadius: 3,
  },
  sliderValue: {
    fontSize: 12,
    color: '#666',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    margin: 4,
  },
  feedbackButton: {
    backgroundColor: '#33c37e',
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    color: '#bbb',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  checkboxOption: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
  },
  checkedOption: {
    borderColor: '#33c37e',
    backgroundColor: '#e1f8ec',
  },
  modalButton: {
    backgroundColor: '#33c37e',
    padding: 12,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'center',
  },
});

  // Summary Styles
  const summaryStyles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: "white",
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
      justifyContent: "center",
      width: "100%",
      marginBottom: 30,
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
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
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

  function renderResultsScreen(): React.ReactNode {
    throw new Error("Function not implemented.");
  }

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
      {currentScreen === "feedback" && renderFeedbackScreen()}
      {currentScreen === "results" && renderResultsScreen()}

      {/* <BottomNavigation onNavPress={handleNavPress} /> */}
    </SafeAreaView>
  );
}
