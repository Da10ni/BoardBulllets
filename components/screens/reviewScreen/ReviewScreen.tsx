// components/screens/ReviewScreen/ReviewScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");

const handleStarPress = (rating: number): void => {
    setSelectedRating(rating);
};

  const handleSubmit = () => {
    if (selectedRating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    // Here you can send the review to your backend
    console.log("Rating:", selectedRating);
    console.log("Feedback:", feedback);

    Alert.alert("Thank You!", "Your feedback has been submitted successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= selectedRating ? "star" : "star-outline"}
            size={40}
            color={i <= selectedRating ? "#FFD700" : "#E0E0E0"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#4864AC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR FEEDBACK</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.feedbackCard}>
          <Text style={styles.questionText}>
            HOW WAS YOUR BOARDBULLETS EXPERIENCE?
          </Text>

          {/* Star Rating */}
          <View style={styles.starsContainer}>{renderStars()}</View>

          {/* Feedback Input */}
          <TextInput
            style={styles.feedbackInput}
            placeholder="GIVE FEEDBACK, SUGGEST IMPROVEMENT OR SHARE IDEAS"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#4864AC",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4864AC",
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  feedbackCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  starButton: {
    marginHorizontal: 5,
    padding: 5,
  },
  feedbackInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#F9F9F9",
    marginBottom: 30,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: "#4864AC",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#4864AC",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default ReviewScreen;
