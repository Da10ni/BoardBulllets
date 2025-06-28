import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Simple Icon Component (without external library)
const Icon = ({
  name,
  size,
  color,
}: {
  name: string;
  size: number;
  color: string;
}) => {
  const iconMap: { [key: string]: string } = {
    menu: "☰",
    "more-vert": "⋮",
    "keyboard-arrow-down": "▼",
    home: "🏠",
    "": "👤",
    Pricing: "🏷️",
    add: "+",
  };

  return (
    <Text style={{ fontSize: size, color, fontWeight: "bold" }}>
      {iconMap[name] || "?"}
    </Text>
  );
};

interface QuestionScreenProps {
  navigation?: any; // You can use proper navigation type from @react-navigation/native
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ navigation }) => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [distractor1, setDistractor1] = useState("");
  const [distractor2, setDistractor2] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = () => {
    console.log("Submit pressed");
    console.log({
      correctAnswer,
      distractor1,
      distractor2,
      category,
      subCategory,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C7B7F" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BOARDBULLETS</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Submit a Question Section */}
        <View style={styles.submitSection}>
          <Text style={styles.submitTitle}>SUBMIT A QUESTION</Text>
          <Text style={styles.submitDescription}>
            NEVER STUDIED WITH A MEDICAL{"\n"}
            REASONING? FRACTURE?
          </Text>

          {/* Answer Input Fields */}
          <View style={styles.inputsContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CORRECT ANSWER</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabelRed}>DISTRACTOR 1</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabelRed}>DISTRACTOR 2</Text>
            </View>
          </View>

          {/* Category Dropdowns */}
          <View style={styles.dropdownsContainer}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{category || "CATEGORY"}</Text>
              <Icon name="keyboard-arrow-down" size={16} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {subCategory || "SUB-CATEGORY"}
              </Text>
              <Icon name="keyboard-arrow-down" size={16} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="local-offer" size={24} color="#666" />
          <Text style={styles.navText}>Pricing</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    shadowColor: "#000",
    //
  },
  submitTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#4066af",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  submitDescription: {
    fontSize: 12,
    textAlign: "center",

    color: "black",
    lineHeight: 16,
    marginBottom: 20,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "green",
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputLabelRed: {
    fontSize: 12,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#FAFAFA",
    minHeight: 40,
    textAlignVertical: "top",
  },
  dropdownsContainer: {
    marginBottom: 25,
    gap: 12,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FAFAFA",
  },
  dropdownText: {
    fontSize: 14,
    color: "#8A8A8A",
    letterSpacing: 0.5,
  },
  submitButton: {
    backgroundColor: "#4A6FA5",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
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
