import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

interface QuestionScreenProps {
  navigation?: any; // You can use proper navigation type from @react-navigation/native
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ navigation }) => {
  const handleSubmitQuestion = () => {
    console.log("Submit question pressed");
    // Add your navigation or submit logic here
  };

  const handleDistractor1 = () => {
    console.log("Distractor 1 pressed");
  };

  const handleDistractor2 = () => {
    console.log("Distractor 2 pressed");
  };

  const handleCorrectAnswer = () => {
    console.log("Correct answer pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C7B7F" barStyle="light-content" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content */}
        <View style={styles.content}>
          {/* Submit a Question Section */}
          <View style={styles.submitSection}>
            <Text style={styles.submitTitle}>SUBMIT A QUESTION</Text>
            <Text style={styles.submitDescription}>
              THE DISPLAYING CONTENT WILL GIVE{"\n"}
              BY NISARG EXAMPLE VESTIBULUM VE-{"\n"}
              HICULA A PARTURIENT METUS. IPSUM{"\n"}
              CONSEQUAT ADIPISCING A ADIPISCING.
            </Text>
            <TouchableOpacity style={styles.submitButtonContainer}>
              <Text style={styles.submitButtonText}>
                ENTER YOUR QUESTION (E.G.{"\n"}
                ASSOCIATED WITH A X-RAY SHOWING{"\n"}
                FEMORAL HEAD SCLEROSIS?) MAX{"\n"}
                CHAR. 300
              </Text>
            </TouchableOpacity>

            {/* Answer Options */}
            <View style={styles.answersContainer}>
              <TouchableOpacity
                style={styles.correctAnswerButton}
                onPress={handleCorrectAnswer}
              >
                <Text style={styles.correctAnswerText}>CORRECT ANSWER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.distractorButton}
                onPress={handleDistractor1}
              >
                <Text style={styles.distractorText}>DISTRACTOR 1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.distractorButton}
                onPress={handleDistractor2}
              >
                <Text style={styles.distractorText}>DISTRACTOR 2</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacer for bottom padding */}
          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {/* Fixed Next Button - Outside ScrollView */}
      <TouchableOpacity
        style={styles.fixedNextButton}
        onPress={() => router.push("/addQuestion")}
      >
        <MaterialIcons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  submitSection: {
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  submitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C7B7F",
    marginBottom: 15,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  submitDescription: {
    fontSize: 12,
    color: "#8A8A8A",
    lineHeight: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  submitButtonContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 11,
    color: "#8A8A8A",
    textAlign: "center",
    lineHeight: 16,
  },
  answersContainer: {
    gap: 15,
  },
  correctAnswerButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  correctAnswerText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  distractorButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6B6B",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  distractorText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  nextButtonContainer: {
    alignItems: "flex-end",
    marginTop: 30,
    marginBottom: 20,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6C7B7F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fixedNextButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6C7B7F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  spacer: {
    height: 50,
  },
});

export default QuestionScreen;