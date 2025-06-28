// QuizMe.styles.ts - Complete Styles for Quiz Flow
import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.background.primary,
    // backgroundColor: "#d9d9d9"
  },
  scrollView: {
    flex: 1,
  },
  homeSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  homeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  spacer: {
    height: 20,
  },

  // Timer Section Styles
  //   timerSection: {
  //     bottom:0,
  //     backgroundColor: Colors.background.secondary || '#FFFFFF',
  //    marginVertical: "77%",
  //     borderRadius: 12,
  //     paddingVertical: 30,
  //     paddingHorizontal: 20,
  //     alignItems: 'center',
  //     shadowColor: '#000',
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 3.84,
  //     elevation: 5,
  //   },
  timerSection: {
    backgroundColor: Colors.background.secondary || "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    gap: 40,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border || "#E9ECEF",
  },
  activeIconContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  timedLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
    marginBottom: 30,
    letterSpacing: 1,
  },
  timeOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  timeOption: {
    marginHorizontal: 25,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  selectedTimeOption: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  timeText: {
    fontSize: 32,
    fontWeight: "300",
    color: "#ADB5BD",
    textAlign: "center",
  },
  selectedTimeText: {
    color: Colors.primary,
    fontWeight: "400",
  },
  startQuizButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startQuizButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Question Screen Styles
  questionContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    height: 650,
    paddingHorizontal: 20,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border || "#E9ECEF",
    marginBottom: 20,
  },
  timerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E9ECEF",
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  completedDot: {
    backgroundColor: "#4CAF50",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "10",
  },
  correctOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50" + "10",
  },
  incorrectOption: {
    borderColor: "#F44336",
    backgroundColor: "#F44336" + "10",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text.primary,
    textAlign: "center",
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    //marginTop: 90,
    marginBottom: 70,
    paddingVertical: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  close: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Summary Screen Styles
  summaryContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 40,
    letterSpacing: 1,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scorePercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text.secondary,
    letterSpacing: 0.5,
  },
  reviewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  reviewButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  homeButton: {
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  homeButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Results Screen Styles
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  resultStatus: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  correct: {
    color: "#4CAF50",
  },
  incorrect: {
    color: "#F44336",
  },
  resultOption: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  correctResultOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50" + "10",
  },
  incorrectResultOption: {
    borderColor: "#F44336",
    backgroundColor: "#F44336" + "10",
  },
  resultOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text.primary,
    flex: 1,
  },
  correctResultText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 1,
  },
  finishButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
