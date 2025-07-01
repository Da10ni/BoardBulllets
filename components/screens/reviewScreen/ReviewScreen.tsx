// components/screens/ReviewScreen/ReviewScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleStarPress = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    console.log("Rating:", selectedRating);

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
            size={35}
            color={i <= selectedRating ? "#155DA1" : "#E0E0E0"}
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
          {/* Title */}
          <Text style={styles.cardTitle}>YOUR FEEDBACK</Text>

          {/* Question */}
          <Text style={styles.questionText}>
            HOW WAS YOUR BOARDBULLETS EXPERIENCE?
          </Text>

          {/* Star Rating */}
          <View style={styles.starsContainer}>{renderStars()}</View>

          {/* Recommendation Text */}
          <Text style={styles.recommendText}>
            VERY HELPFUL, WOULD RECOMMEND TO PEERS
          </Text>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              isButtonPressed && styles.submitButtonPressed
            ]}
            onPress={handleSubmit}
            onPressIn={() => setIsButtonPressed(true)}
            onPressOut={() => setIsButtonPressed(false)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.submitText,
              isButtonPressed && styles.submitTextPressed
            ]}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF", // Light blue background
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
    paddingHorizontal: 30,
  },
  feedbackCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 0, // Remove padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E8F0FE",
    overflow: "hidden", // Important for full width
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 25,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 0.5,
    lineHeight: 20,
    paddingHorizontal: 25,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#F8FAFE",
    paddingVertical: 15,
    paddingHorizontal: 0, // Remove side padding
    borderRadius: 0, // Remove border radius for full width
    borderWidth: 0, // Remove border
    width: "100%",
  },
  starButton: {
    marginHorizontal: 5,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 0.5,
    fontWeight: "500",
    paddingHorizontal: 25,
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: "#155DA1",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#155DA1",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  submitButtonPressed: {
    backgroundColor: "#F0F4FF",
  },
  submitTextPressed: {
    color: "#f0eded",
  },
});

export default ReviewScreen;