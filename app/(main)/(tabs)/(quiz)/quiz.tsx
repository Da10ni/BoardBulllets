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
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useQuiz } from "@/utils/axiosInstance"; // ✅ Import API hook

const { width } = Dimensions.get("window");

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
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

  // Feedback popup states
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [customFeedback, setCustomFeedback] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  // ✅ API Integration States
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ✅ Get API hook
  const { getQuestion } = useQuiz();

  const timeOptions = [5, 10, 20];

  // ✅ Use API data if available, fallback to sample data
  const QUIZ_DATA =
    quizData.length > 0
      ? quizData
      : [
          {
            id: 1,
            question: "NERVE INJURED WITH A MEDIAL EPICONDYLE FRACTURE?",
            options: ["MEDIAN NERVE", "RADIAL NERVE", "ULNAR NERVE"],
            correctAnswer: 2,
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
        ];

  const currentQuestion = QUIZ_DATA[currentQuestionIndex];
  const totalQuestions = QUIZ_DATA.length;

  const completedAnim = useRef<any>(null);
  const incorrectAnim = useRef<any>(null);
  const pointsAnim = useRef<any>(null);
  const rankAnim = useRef<any>(null);

  const feedbackOptions = [
    { id: "spelling", label: "CHECK SPELLING" },
    { id: "grammar", label: "CHECK GRAMMAR" },
    { id: "content", label: "CONTENT REVIEW" },
    { id: "other", label: "OTHER:" },
  ];

  // ✅ API Call Function
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setApiError(null);

      console.log("🚀 Fetching questions from API...");
      const result = await getQuestion();

      if (result.success && result.question) {
        console.log(
          "✅ Questions fetched successfully:",
          result.question.length
        );

        // ✅ Transform API data to match current structure
        const transformedData = result.question.map(
          (item: any, index: number) => ({
            id: item._id || index + 1,
            question: item.question || "Sample Question",
            options: item.options || [
              "Option A",
              "Option B",
              "Option C",
              "Option D",
            ],
            correctAnswer: item.correctAnswer || 0,
            explanation: item.explanation || "No explanation provided.",
            difficulty: item.difficulty || "MEDIUM",
            popularity: item.popularity || "MEDIUM",
            category: item.category,
            subCategory: item.subCategory,
          })
        );

        setQuizData(transformedData);
        console.log("✅ Quiz data set:", transformedData.length, "questions");
      } else {
        console.log("⚠️ No questions received from API, using fallback data");
        setApiError("No questions available from server");
      }
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      setApiError("Failed to load questions. Using sample data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

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
    if (QUIZ_DATA.length === 0) {
      Alert.alert("Error", "No questions available. Please try again later.");
      return;
    }

    setTimeRemaining(selectedTime * 60);
    setQuizStarted(true);
    setCurrentScreen("question");
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));

    setSelectedAnswer(null);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
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

  // ✅ Retry API call function
  const handleRetryFetch = () => {
    fetchQuestions();
  };

  // Feedback popup handlers
  const handleFeedbackSelect = (option: string) => {
    setSelectedFeedback(option);
  };

  const handleFeedbackSubmit = () => {
    if (!selectedFeedback) {
      Alert.alert("Error", "Please select a feedback option");
      return;
    }

    const feedbackData = {
      type: selectedFeedback,
      customText: selectedFeedback === "other" ? customFeedback : "",
      additionalComments: additionalComments,
    };

    console.log("Feedback submitted:", feedbackData);

    resetFeedbackForm();
    setFeedbackModalVisible(false);
    Alert.alert("Success", "Feedback submitted successfully!");
  };

  const resetFeedbackForm = () => {
    setSelectedFeedback("");
    setCustomFeedback("");
    setAdditionalComments("");
    setIsPressed(false);
  };

  const handleFeedbackClose = () => {
    resetFeedbackForm();
    setFeedbackModalVisible(false);
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

  // Integrated FeedbackPopup Component
  const renderFeedbackPopup = () => (
    <Modal
      visible={feedbackModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleFeedbackClose}
    >
      <View style={feedbackPopupStyles.modalOverlay}>
        <View style={feedbackPopupStyles.modalContent}>
          <View style={feedbackPopupStyles.header}>
            <Text style={feedbackPopupStyles.headerText}>FEEDBACK</Text>
          </View>

          <View style={feedbackPopupStyles.optionsGrid}>
            {feedbackOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleFeedbackSelect(option.id)}
                style={[
                  feedbackPopupStyles.optionButton,
                  selectedFeedback === option.id &&
                    (option.id === "other"
                      ? feedbackPopupStyles.selectedOtherButton
                      : feedbackPopupStyles.selectedButton),
                ]}
              >
                <Text
                  style={[
                    feedbackPopupStyles.optionText,
                    selectedFeedback === option.id &&
                      feedbackPopupStyles.selectedText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={feedbackPopupStyles.inputContainer}>
            <TextInput
              style={[
                feedbackPopupStyles.textInput,
                selectedFeedback !== "other" &&
                  feedbackPopupStyles.disabledInput,
              ]}
              placeholder="Enter feedback..."
              placeholderTextColor="#999"
              value={selectedFeedback === "other" ? customFeedback : ""}
              onChangeText={setCustomFeedback}
              editable={selectedFeedback === "other"}
            />

            <TextInput
              style={feedbackPopupStyles.textInput}
              placeholder="Additional comments..."
              placeholderTextColor="#999"
              value={additionalComments}
              onChangeText={setAdditionalComments}
            />
          </View>

          <View style={feedbackPopupStyles.buttonContainer}>
            <TouchableOpacity
              onPress={handleFeedbackClose}
              style={feedbackPopupStyles.cancelButton}
            >
              <Text style={feedbackPopupStyles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleFeedbackSubmit}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                feedbackPopupStyles.submitButton,
                isPressed && feedbackPopupStyles.submitButtonPressed,
              ]}
            >
              <Text
                style={[
                  feedbackPopupStyles.submitText,
                  isPressed && feedbackPopupStyles.submitTextPressed,
                ]}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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

        {/* ✅ Loading/Error State */}
        {loading && (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <ActivityIndicator size="large" color="#3257a8" />
            <Text style={{ marginTop: 10, color: "#666" }}>
              Loading questions...
            </Text>
          </View>
        )}

        {apiError && (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text
              style={{
                color: "#F44336",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {apiError}
            </Text>
            <TouchableOpacity
              onPress={handleRetryFetch}
              style={{
                backgroundColor: "#3257a8",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>RETRY</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ✅ Questions Count Display */}
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text style={{ color: "#666", fontSize: 14 }}>
            📝 Questions Available: {QUIZ_DATA.length}
          </Text>
          {quizData.length > 0 && (
            <Text style={{ color: "#4CAF50", fontSize: 12, marginTop: 5 }}>
              ✅ Loaded from server
            </Text>
          )}
        </View>

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
          style={[
            styles.startQuizButton,
            (loading || QUIZ_DATA.length === 0) && { backgroundColor: "#ccc" },
          ]}
          onPress={handleStartQuiz}
          disabled={loading || QUIZ_DATA.length === 0}
        >
          <Text style={styles.startQuizButtonText}>
            {loading ? "LOADING..." : "START QUIZ"}
          </Text>
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

        <Text style={styles.questionText}>
          {currentQuestion?.question || "Loading question..."}
        </Text>

        <View style={styles.optionsContainer}>
          {(currentQuestion?.options || []).map((option, index) => (
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
                    {index + 1}
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
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderFeedbackScreen = () => {
    const reviewQuestion = QUIZ_DATA[reviewQuestionIndex];
    const userAnswer = userAnswers[reviewQuestion.id];
    const isCorrect = userAnswer === reviewQuestion.correctAnswer;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={flatFeedbackStyles.container}>
          <View style={flatFeedbackStyles.headerRow}>
            <Text style={flatFeedbackStyles.timerText}>00:25</Text>
            <Text
              style={
                isCorrect
                  ? flatFeedbackStyles.correct
                  : flatFeedbackStyles.incorrect
              }
            >
              {isCorrect ? "CORRECT" : "INCORRECT"}
            </Text>
          </View>

          <Text style={flatFeedbackStyles.questionNumber}>
            QUESTION {reviewQuestionIndex + 1}
          </Text>
          <Text style={flatFeedbackStyles.questionText}>
            {reviewQuestion.question}
          </Text>

          {reviewQuestion.options.map((opt, idx) => {
            const selected = userAnswer === idx;
            const correct = reviewQuestion.correctAnswer === idx;
            let style = flatFeedbackStyles.optionButton;

            if (correct) style = flatFeedbackStyles.correctOption;
            else if (selected && !correct)
              style = flatFeedbackStyles.incorrectOption;

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
              <View style={[flatFeedbackStyles.sliderFill, { width: "60%" }]} />
            </View>
            <Text style={flatFeedbackStyles.sliderValue}>
              {reviewQuestion.popularity}
            </Text>
          </View>

          <View style={flatFeedbackStyles.sliderRow}>
            <Text style={flatFeedbackStyles.sliderLabel}>DIFFICULTY</Text>
            <View style={flatFeedbackStyles.sliderTrack}>
              <View style={[flatFeedbackStyles.sliderFill, { width: "50%" }]} />
            </View>
            <Text style={flatFeedbackStyles.sliderValue}>
              {reviewQuestion.difficulty}
            </Text>
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
            onPress={() => setFeedbackModalVisible(true)}
          >
            <Text style={flatFeedbackStyles.feedbackButtonText}>FEEDBACK</Text>
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
      let backgroundColor = "#E5E5E5";

      if (userAnswer === null || userAnswer === undefined) {
        backgroundColor = "#E5E5E5";
      } else if (userAnswer === question.correctAnswer) {
        backgroundColor = "#4CAF50";
      } else {
        backgroundColor = "#F44336";
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
        <View style={summaryStyles.header}>
          <Text style={summaryStyles.headerTitle}>QUIZ SUMMARY</Text>
        </View>

        <View style={summaryStyles.circlesGrid}>
          <View style={summaryStyles.circlesRow}>
            {renderCircle(
              "RAW\nSCORE",
              `${score.correct}/${score.total}`,
              completedAnim,
              "#FFB84D"
            )}
            {renderCircle("QUIZ\nBB POINTS", "92", pointsAnim, "#4A90E2")}
          </View>

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

        <View style={summaryStyles.reviewSection}>
          <Text style={summaryStyles.reviewTitle}>REVIEW QUIZ</Text>

          <View style={summaryStyles.dotsContainer}>
            <View style={summaryStyles.dotsRow}>
              {QUIZ_DATA.map((_, index) => renderReviewDot(index))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  // StyleSheets
  const feedbackPopupStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: "#ffffff",
      borderRadius: 24,
      width: "100%",
      maxWidth: 350,
      paddingTop: 24,
      paddingHorizontal: 24,
      paddingBottom: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      position: "relative",
    },
    header: {
      alignItems: "center",
      marginBottom: 32,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      letterSpacing: 1.5,
    },
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    optionButton: {
      backgroundColor: "#e5e5e5",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      width: "48%",
      marginBottom: 12,
      alignItems: "center",
    },
    selectedButton: {
      backgroundColor: "#9ca3af",
    },
    selectedOtherButton: {
      backgroundColor: "#3b82f6",
    },
    optionText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#555",
      textAlign: "center",
    },
    selectedText: {
      color: "#ffffff",
    },
    inputContainer: {
      marginBottom: 24,
    },
    textInput: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 12,
      fontSize: 14,
      color: "#333",
      backgroundColor: "#fff",
    },
    disabledInput: {
      backgroundColor: "#f5f5f5",
      color: "#999",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 16,
      alignItems: "center",
      marginRight: 8,
    },
    cancelText: {
      color: "#666",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    submitButton: {
      backgroundColor: "#ffffff",
      borderTopWidth: 1,
      borderTopColor: "#d1d5db",
      flex: 1,
      paddingVertical: 16,
      alignItems: "center",
      borderBottomRightRadius: 24,
      marginLeft: 8,
    },
    submitButtonPressed: {
      backgroundColor: "#f3f4f6",
    },
    submitText: {
      color: "#000000",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    submitTextPressed: {
      color: "#000000",
    },
  });

  const flatFeedbackStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    timerText: {
      fontSize: 16,
      color: "#999",
    },
    correct: {
      color: "#4CAF50",
      fontWeight: "bold",
    },
    incorrect: {
      color: "#F44336",
      fontWeight: "bold",
    },
    questionNumber: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
      color: "#333",
    },
    questionText: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#000",
    },
    optionButton: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 12,
      padding: 10,
      marginBottom: 10,
    },
    correctOption: {
      backgroundColor: "#e6f4ea",
      borderRadius: 12,
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#4CAF50",
    },
    incorrectOption: {
      backgroundColor: "#fbeaea",
      borderRadius: 12,
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#F44336",
    },
    optionText: {
      fontSize: 14,
      color: "#000",
    },
    optionTextCorrect: {
      fontSize: 14,
      color: "#4CAF50",
      fontWeight: "bold",
    },
    optionTextIncorrect: {
      fontSize: 14,
      color: "#F44336",
      fontWeight: "bold",
    },
    sliderRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    sliderLabel: {
      width: 80,
      fontSize: 12,
      fontWeight: "bold",
      color: "#666",
    },
    sliderTrack: {
      flex: 1,
      height: 6,
      backgroundColor: "#e0e0e0",
      borderRadius: 3,
      marginHorizontal: 8,
    },
    sliderFill: {
      height: 6,
      backgroundColor: "#33c37e",
      borderRadius: 3,
    },
    sliderValue: {
      fontSize: 12,
      color: "#666",
    },
    dotsRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 20,
      flexWrap: "wrap",
      gap: 8,
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      margin: 4,
    },
    feedbackButton: {
      backgroundColor: "#4864AC",
      padding: 12,
      borderRadius: 20,
      marginTop: 20,
      alignItems: "center",
    },
    feedbackButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    footer: {
      marginTop: 30,
      textAlign: "center",
      color: "#bbb",
      fontSize: 12,
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

      {/* Integrated Feedback Popup Component */}
      {renderFeedbackPopup()}
    </SafeAreaView>
  );
}
