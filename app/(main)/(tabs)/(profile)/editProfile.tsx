import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({
    institution: "",
    countryResidence: "",
    dateOfBirth: "",
    gender: "",
    dateOfGraduation: "",
  });

  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const genderOptions = ["MALE", "FEMALE", "OTHER", "PREFER NOT TO SAY"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderSelect = (gender) => {
    handleInputChange("gender", gender);
    setShowGenderPicker(false);
  };

  const handleUpdate = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!"
    );
  };

  const handleUpload = () => {
    Alert.alert(
      "Upload Photo",
      "Photo upload functionality would be implemented here."
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Edit Profile Title */}
        <Text style={styles.pageTitle}>EDIT PROFILE</Text>

        {/* Upload Photo Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>UPLOAD</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Institution */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="INSTITUTION"
              placeholderTextColor="#4864AC"
              value={formData.institution}
              onChangeText={(value) => handleInputChange("institution", value)}
            />
          </View>

          {/* Country Residence */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="COUNTRY RESIDENCE"
              placeholderTextColor="#4864AC"
              value={formData.countryResidence}
              onChangeText={(value) =>
                handleInputChange("countryResidence", value)
              }
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="DATE OF BIRTH"
              placeholderTextColor="#4864AC"
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange("dateOfBirth", value)}
            />
          </View>

          {/* Gender Dropdown */}
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowGenderPicker(!showGenderPicker)}
          >
            <Text
              style={[
                styles.dropdownText,
                !formData.gender && styles.placeholderText,
              ]}
            >
              {formData.gender || "GENDER"}
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={24}
              color="#4864AC"
              style={[
                styles.dropdownIcon,
                showGenderPicker && styles.dropdownIconRotated,
              ]}
            />
          </TouchableOpacity>

          {/* Gender Options */}
          {showGenderPicker && (
            <View style={styles.optionsContainer}>
              {genderOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => handleGenderSelect(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Date of Graduation */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="DATE OF GRADUATION"
              placeholderTextColor="#4864AC"
              value={formData.dateOfGraduation}
              onChangeText={(value) =>
                handleInputChange("dateOfGraduation", value)
              }
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4864AC",
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 16,
    color: "#4864AC",
    textAlign: "center",
    marginVertical: 25,
    letterSpacing: 1,
  },
  uploadSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#4864AC",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 18,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginHorizontal: 30,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#4864AC",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 18,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  placeholderText: {
    color: "#4864AC",
  },
  dropdownIcon: {
    position: "absolute",
    right: 15,
  },
  dropdownIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    marginTop: -15,
    marginBottom: 20,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  updateButton: {
    backgroundColor: "#4864AC",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 30,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default EditProfileScreen;
