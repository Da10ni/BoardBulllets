import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FeedbackPopupProps {
  feedbackVisible: boolean;
  setFeedbackVisible: (visible: boolean) => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  feedbackVisible,
  setFeedbackVisible,
}) => {
  const [selectedRating, setSelectedRating] = useState(4); // Default 4 stars selected

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedRating(i)}
          style={styles.starButton}
        >
          <Text
            style={[
              styles.star,
              { color: i <= selectedRating ? "#4A90E2" : "#E0E0E0" },
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal
      visible={feedbackVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setFeedbackVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.feedbackModal}>
          {/* Title */}
          <Text style={styles.title}>YOUR FEEDBACK</Text>

          {/* Question */}
          <Text style={styles.question}>HOW WAS YOUR B4AI EXPERIENCE?</Text>

          {/* Stars Rating */}
          <View style={styles.starsContainer}>{renderStars()}</View>

          {/* Rating Text */}
          <Text style={styles.ratingText}>
            VERY HELPFUL, WOULD RECOMMEND TO PEERS
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setFeedbackVisible(false)}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackModal: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 25,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    letterSpacing: 1,
  },
  question: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  starButton: {
    padding: 2,
  },
  star: {
    fontSize: 28,
  },
  ratingText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 0.5,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#8A8A8A",
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default FeedbackPopup;
