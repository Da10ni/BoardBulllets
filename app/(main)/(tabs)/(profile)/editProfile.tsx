import Icon from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  Image, // ✅ Added missing Image import
} from "react-native";
import { useAuth } from "@/utils/axiosInstance";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    institute: "",
    residence: "",
    DOG: "", // Date of Graduation
    speciality: "",
  });

  const { userId } = useLocalSearchParams();
  const { getProfile, updateProfile } = useAuth();

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  // Date picker states
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showDOGPicker, setShowDOGPicker] = useState(false);
  const [dobDate, setDobDate] = useState(new Date());
  const [dogDate, setDogDate] = useState(new Date());

  const genderOptions = ["male", "female"];

  // ✅ Load existing user data with auto-refresh on focus
  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        if (userId) {
          try {
            console.log("🔄 Refreshing user data on screen focus");
            const res = await getProfile(userId as string);
            if (res?.success && res?.user) {
              const user = res.user;
              setUserData(user);

              // Pre-fill form with latest data
              setFormData({
                firstName: user.profile?.firstName || "",
                lastName: user.profile?.lastName || "",
                DOB: user.profile?.DOB || "",
                gender: user.profile?.gender || "",
                institute: user.profile?.institute || "",
                residence: user.profile?.residence || "",
                DOG: user.profile?.DOG || "",
                speciality: user.profile?.speciality || "",
              });

              // Set dates for picker if available
              if (user.profile?.DOB) {
                setDobDate(new Date(user.profile.DOB));
              }
              if (user.profile?.DOG) {
                setDogDate(new Date(user.profile.DOG));
              }

              console.log("✅ Form data refreshed with latest user data");
            }
          } catch (error) {
            console.log("❌ Error loading user data:", error);
          }
        }
      };

      loadUserData();
    }, [userId])
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    handleInputChange("gender", gender);
    setShowGenderPicker(false);
  };

  // ✅ Date picker handlers
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  const onDOBChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDOBPicker(false);
    }

    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      handleInputChange("DOB", formattedDate);
    }
  };

  const onDOGChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDOGPicker(false);
    }

    if (selectedDate) {
      setDogDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      handleInputChange("DOG", formattedDate);
    }
  };

  const hideDOBPicker = () => {
    setShowDOBPicker(false);
  };

  const hideDOGPicker = () => {
    setShowDOGPicker(false);
  };

  // ✅ Image picker function
  const handleUpload = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission",
          "Permission to access camera roll is required!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0]);
        console.log("Image selected:", result.assets[0]);
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  // ✅ Update profile function - FIXED FormData
  const handleUpdate = async () => {
    try {
      // Basic validation
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.DOB ||
        !formData.gender
      ) {
        Alert.alert(
          "Error",
          "Please fill in all required fields (First Name, Last Name, Date of Birth, Gender)"
        );
        return;
      }

      setLoading(true);
      console.log("🚀 Starting profile update...");

      // Create FormData for multipart upload
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("DOB", formData.DOB);
      formDataToSend.append("gender", formData.gender);

      // Add optional fields if they exist
      if (formData.institute)
        formDataToSend.append("institute", formData.institute);
      if (formData.residence)
        formDataToSend.append("residence", formData.residence);
      if (formData.DOG) formDataToSend.append("DOG", formData.DOG);
      if (formData.speciality)
        formDataToSend.append("speciality", formData.speciality);

      console.log("📸 Profile image data:", profileImage);

      // ✅ FIXED: Add profile image with proper file structure for backend
      if (profileImage) {
        const fileExtension = profileImage.uri.split(".").pop() || "jpg";
        const fileName = `profile_${Date.now()}.${fileExtension}`;

        // This is the correct format for React Native FormData
        formDataToSend.append("profilePic", {
          uri: profileImage.uri,
          type: `image/${fileExtension}`,
          name: fileName,
        } as any);

        console.log("✅ Profile image added to FormData:", fileName);
      }

      // Debug FormData contents
      console.log("📋 FormData contents:");
      const formDataEntries = (formDataToSend as any)._parts;
      if (formDataEntries) {
        formDataEntries.forEach(([key, value]: [string, any]) => {
          if (typeof value === "object" && value.uri) {
            console.log(`${key}:`, {
              uri: value.uri,
              type: value.type,
              name: value.name,
            });
          } else {
            console.log(`${key}:`, value);
          }
        });
      }

      console.log("📤 Sending form data to API...");

      // Call update API
      const result = await updateProfile(formDataToSend);

      console.log("📥 API Response:", result);

      if (result?.success) {
        Alert.alert("Success", "Profile updated successfully!", [
          {
            text: "OK",
            onPress: () => router.back(), // Go back to profile screen
          },
        ]);
      } else {
        Alert.alert("Error", result?.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("❌ Update error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Edit Profile Title */}
        <Text style={styles.pageTitle}>EDIT PROFILE</Text>

        {/* ✅ FIXED: Upload Photo Section with proper styling */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage.uri }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <>
                <Icon name="camera-alt" size={24} color="#666" />
                <Text style={styles.uploadText}>UPLOAD{"\n"}PHOTO</Text>
              </>
            )}
          </TouchableOpacity>

          {profileImage && (
            <View style={styles.imageInfoContainer}>
              <Text style={styles.imageSelectedText}>✓ Photo Selected</Text>
              <TouchableOpacity onPress={() => setProfileImage(null)}>
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="FIRST NAME *"
              placeholderTextColor="#4864AC"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="LAST NAME *"
              placeholderTextColor="#4864AC"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDOBPicker(true)}
            >
              <Text
                style={[
                  styles.datePickerText,
                  !formData.DOB && styles.placeholderText,
                ]}
              >
                {formData.DOB || "DATE OF BIRTH *"}
              </Text>
              <Icon name="calendar-today" size={20} color="#4864AC" />
            </TouchableOpacity>
          </View>

          {/* Date of Birth Picker */}
          {showDOBPicker && (
            <DateTimePicker
              value={dobDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDOBChange}
              maximumDate={new Date()} // Can't select future dates
              minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
            />
          )}

          {Platform.OS === "ios" && showDOBPicker && (
            <View style={styles.iosPickerContainer}>
              <TouchableOpacity
                style={styles.iosPickerButton}
                onPress={hideDOBPicker}
              >
                <Text style={styles.iosPickerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}

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
              {formData.gender ? formData.gender.toUpperCase() : "GENDER *"}
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
                  <Text style={styles.optionText}>{option.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Institute */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="INSTITUTE"
              placeholderTextColor="#4864AC"
              value={formData.institute}
              onChangeText={(value) => handleInputChange("institute", value)}
            />
          </View>

          {/* Country Residence */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="COUNTRY RESIDENCE"
              placeholderTextColor="#4864AC"
              value={formData.residence}
              onChangeText={(value) => handleInputChange("residence", value)}
            />
          </View>

          {/* Date of Graduation */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDOGPicker(true)}
            >
              <Text
                style={[
                  styles.datePickerText,
                  !formData.DOG && styles.placeholderText,
                ]}
              >
                {formData.DOG || "DATE OF GRADUATION"}
              </Text>
              <Icon name="calendar-today" size={20} color="#4864AC" />
            </TouchableOpacity>
          </View>

          {/* Date of Graduation Picker */}
          {showDOGPicker && (
            <DateTimePicker
              value={dogDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDOGChange}
              maximumDate={new Date(2050, 11, 31)} // Future graduation dates allowed
              minimumDate={new Date(1950, 0, 1)}
            />
          )}

          {Platform.OS === "ios" && showDOGPicker && (
            <View style={styles.iosPickerContainer}>
              <TouchableOpacity
                style={styles.iosPickerButton}
                onPress={hideDOGPicker}
              >
                <Text style={styles.iosPickerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Speciality */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="SPECIALITY"
              placeholderTextColor="#4864AC"
              value={formData.speciality}
              onChangeText={(value) => handleInputChange("speciality", value)}
            />
          </View>
        </View>

        {/* Required Fields Note */}
        <Text style={styles.noteText}>* Required fields</Text>

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.updateButton, loading && styles.updateButtonDisabled]}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
          )}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginVertical: 25,
    letterSpacing: 1,
  },
  uploadSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  uploadButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    overflow: "hidden", // ✅ Important for circular image
  },
  // ✅ NEW: Profile image styling
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  uploadText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  // ✅ NEW: Image info container
  imageInfoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  imageSelectedText: {
    fontSize: 12,
    color: "#28A745",
    fontWeight: "500",
    marginBottom: 5,
  },
  // ✅ NEW: Remove image button
  removeImageText: {
    fontSize: 11,
    color: "#DC3545",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  formContainer: {
    marginBottom: 20,
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
  noteText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  updateButton: {
    backgroundColor: "#4864AC",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 30,
  },
  updateButtonDisabled: {
    backgroundColor: "#999",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#4864AC",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 18,
    marginHorizontal: 30,
  },
  datePickerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  iosPickerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  iosPickerButton: {
    backgroundColor: "#4864AC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  iosPickerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
