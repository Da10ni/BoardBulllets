import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get('window');

// Simple Icon Component
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
    "keyboard-arrow-up": "▲",
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

// Categories and Subcategories Data
const CATEGORIES = [
  {
    id: 1,
    name: "General Knowledge",
    subCategories: [
      "History",
      "Geography", 
      "Science",
      "Sports",
      "Politics",
      "Current Affairs",
      "Art & Culture",
      "Literature"
    ]
  },
  {
    id: 2,
    name: "Technology",
    subCategories: [
      "Programming",
      "Web Development",
      "Mobile Apps",
      "AI/ML",
      "Cybersecurity",
      "Data Science",
      "Cloud Computing",
      "Blockchain"
    ]
  },
  {
    id: 3,
    name: "Education",
    subCategories: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Economics",
      "Psychology",
      "Philosophy"
    ]
  },
  {
    id: 4,
    name: "Entertainment",
    subCategories: [
      "Movies",
      "Music",
      "TV Shows",
      "Gaming",
      "Celebrity",
      "Fashion",
      "Food & Cooking",
      "Travel"
    ]
  },
  {
    id: 5,
    name: "Business",
    subCategories: [
      "Finance",
      "Marketing",
      "Entrepreneurship",
      "Management",
      "Sales",
      "Investment",
      "Banking",
      "Stock Market"
    ]
  },
  {
    id: 6,
    name: "Health & Fitness",
    subCategories: [
      "Nutrition",
      "Exercise",
      "Mental Health",
      "Medicine",
      "Yoga",
      "Diet",
      "Sports Medicine",
      "First Aid"
    ]
  }
];

interface QuestionScreenProps {
  navigation?: any;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ navigation }) => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [distractor1, setDistractor1] = useState("");
  const [distractor2, setDistractor2] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

  // Get subcategories for selected category
  const getSubCategories = () => {
    const selectedCategory = CATEGORIES.find(cat => cat.name === category);
    return selectedCategory ? selectedCategory.subCategories : [];
  };

  const handleCategorySelect = (categoryName: string) => {
    setCategory(categoryName);
    setSubCategory(""); // Reset subcategory when category changes
    setShowCategoryModal(false);
  };

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSubCategory(subCategoryName);
    setShowSubCategoryModal(false);
  };

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

  // Category Modal Component
  const CategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  category === item.name && styles.selectedModalItem
                ]}
                onPress={() => handleCategorySelect(item.name)}
              >
                <Text style={[
                  styles.modalItemText,
                  category === item.name && styles.selectedModalItemText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  // SubCategory Modal Component
  const SubCategoryModal = () => (
    <Modal
      visible={showSubCategoryModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowSubCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Sub-Category</Text>
            <TouchableOpacity
              onPress={() => setShowSubCategoryModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={getSubCategories()}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  subCategory === item && styles.selectedModalItem
                ]}
                onPress={() => handleSubCategorySelect(item)}
              >
                <Text style={[
                  styles.modalItemText,
                  subCategory === item && styles.selectedModalItemText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C7B7F" barStyle="light-content" />
      
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
            {/* Category Dropdown */}
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={[
                styles.dropdownText,
                category && styles.selectedDropdownText
              ]}>
                {category || "CATEGORY"}
              </Text>
              <Icon name="keyboard-arrow-down" size={16} color="#999" />
            </TouchableOpacity>

            {/* SubCategory Dropdown */}
            <TouchableOpacity 
              style={[
                styles.dropdown,
                !category && styles.disabledDropdown
              ]}
              onPress={() => category && setShowSubCategoryModal(true)}
              disabled={!category}
            >
              <Text style={[
                styles.dropdownText,
                !category && styles.disabledDropdownText,
                subCategory && styles.selectedDropdownText
              ]}>
                {subCategory || "SUB-CATEGORY"}
              </Text>
              <Icon 
                name="keyboard-arrow-down" 
                size={16} 
                color={!category ? "#CCC" : "#999"} 
              />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <CategoryModal />
      <SubCategoryModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  disabledDropdown: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E5E5E5",
  },
  dropdownText: {
    fontSize: 14,
    color: "#8A8A8A",
    letterSpacing: 0.5,
  },
  selectedDropdownText: {
    color: "#4066af",
    fontWeight: "600",
  },
  disabledDropdownText: {
    color: "#CCC",
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
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    width: width * 0.85,
    maxHeight: "70%",
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4066af",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedModalItem: {
    backgroundColor: "#E3F2FD",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedModalItemText: {
    color: "#4066af",
    fontWeight: "600",
  },
});

export default QuestionScreen;