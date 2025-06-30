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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="menu" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>B4AI</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Submit a Question Section */}
        <TouchableOpacity
          style={styles.submitSection}
          onPress={handleSubmitQuestion}
        >
          <Text style={styles.submitTitle}>SUBMIT A QUESTION</Text>
          <Text style={styles.submitDescription}>
            SUBMIT FEEDBACK DIRECTLY TO THE{"\n"}
            BY TEAM BY EXAMPLE VESTIBULUM VEL{"\n"}
            SIT MAURIS, IMPERDIET METUS. IPSUM{"\n"}
            CONSEQUAT ADIPISCING ADIPISCING.
          </Text>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>
              ENTER YOUR QUESTION (E.G.{"\n"}
              ASSOCIATED WITH A PATIENT,{"\n"}
              FEMORAL HEAD SCLEROSIS?) MAX{"\n"}
              400 CHAR
            </Text>
          </View>
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#666" />
          <Text style={styles.navText}>Pricing</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/nestedQuestionScreen")}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C7B7F",
    letterSpacing: 1,
  },
  moreButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  submitSection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C7B7F",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  submitDescription: {
    fontSize: 12,
    color: "#8A8A8A",
    lineHeight: 16,
    marginBottom: 15,
  },
  submitButtonContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  submitButtonText: {
    fontSize: 11,
    color: "#8A8A8A",
    textAlign: "center",
    lineHeight: 14,
  },
  answersContainer: {
    gap: 12,
  },
  correctAnswerButton: {
    backgroundColor: "transparent", // ya is line ko completely remove kar dein
    borderWidth: 2, // border width
    borderColor: "#4CAF50", // same green color border mein
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  correctAnswerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  distractorButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  distractorText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
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
});

export default QuestionScreen;
