// app/Signup.tsx
import AlertPopup from "@/components/Alert/Alert";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/utils/axiosInstance";

// Gender options
const GENDER_OPTIONS = [
  { id: 1, label: "Male", value: "male" },
  { id: 2, label: "Female", value: "female" },
  { id: 3, label: "Other", value: "other" },
  { id: 4, label: "Prefer not to say", value: "not_specified" },
];

const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const { register } = useAuth();

  const handleGenderSelect = (gender: { label: string; value: string }) => {
    setSelectedGender(gender.label);
    setShowGenderDropdown(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (!firstName || !lastName || !email || !password || !confirmPassword || !selectedGender) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      if (password.length < 6) {
        Alert.alert("Error", "Password must be at least 6 characters long.");
        return;
      }

      const signupdata = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        gender: selectedGender,
      };

      // Add your signup logic here
      const data = await register(signupdata);

      if (data?.success) {
        setShowAlert(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4864AC" barStyle="light-content" />
      <AlertPopup
        alertVisible={showAlert}
        setAlertVisible={setShowAlert}
        alertTitle="A Verification Code has been sent to the given email"
        onSuccess={() =>
          router.push({
            pathname: "/confirm-code",
            params: { email: email },
          })
        }
      />

      {/* Diagonal White Background */}
      <View style={styles.whiteBackground} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerTitleBold}>B4</Text>
          <Text style={styles.headerTitleNormal}> AI</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.headerSubtitleBold}>Learn</Text>
          <Text style={styles.headerSubtitleNormal}> & Earn</Text>
        </Text>
      </View>

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={50} color="#4864AC" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>SIGN UP</Text>
          <Text style={styles.subtitle}>TO CREATE A BOARDBULLETS ACCOUNT</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="FIRST NAME"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="LAST NAME"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="EMAIL"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Styled Gender Dropdown - Similar to Edit Profile */}
          <TouchableOpacity
            style={styles.styledDropdownContainer}
            onPress={() => setShowGenderDropdown(!showGenderDropdown)}
          >
            <Ionicons
              name="male-female-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <Text
              style={[
                styles.styledDropdownText,
                selectedGender && styles.selectedDropdownText,
              ]}
            >
              {selectedGender ? selectedGender.toUpperCase() : "SELECT GENDER"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={[
                styles.dropdownIcon,
                showGenderDropdown && styles.dropdownIconRotated,
              ]}
            />
          </TouchableOpacity>

          {/* Gender Options - Styled like Edit Profile */}
          {showGenderDropdown && (
            <View style={styles.styledOptionsContainer}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.styledOptionItem,
                    selectedGender === option.label && styles.selectedOptionItem,
                  ]}
                  onPress={() => handleGenderSelect(option)}
                >
                  <Text
                    style={[
                      styles.styledOptionText,
                      selectedGender === option.label && styles.selectedOptionText,
                    ]}
                  >
                    {option.label.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Submit Button Container */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.signupButtonText}>SIGN UP</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms Text */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              BY TAPPING SIGN UP, YOU AGREE TO OUR{"\n"}
              <Text style={styles.linkText}>PRIVACY POLICY</Text> &{" "}
              <Text style={styles.linkText}>TERMS OF USE</Text>.
            </Text>
          </View>

          {/* Copyright */}
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>
              COPYRIGHT (C) 2017 B4AI, INC.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4864AC",
  },
  whiteBackground: {
    position: "absolute",
    top: -30,
    left: 20,
    width: 50,
    height: 200,
    borderRadius: 360,
    backgroundColor: "white",
    transform: [{ skewY: "-40deg" }],
    transformOrigin: "top left",
    zIndex: 0,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    letterSpacing: 1,
    left: 100,
  },
  headerTitleBold: {
    fontWeight: "800",
  },
  headerTitleNormal: {
    fontWeight: "300",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    left: 120,
  },
  headerSubtitleBold: {
    fontWeight: "bold",
  },
  headerSubtitleNormal: {
    fontWeight: "300",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: "-15%",
    right: "28%",
    zIndex: 1,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 10
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  titleBold: {
    fontWeight: "800",
  },
  titleNormal: {
    fontWeight: "300",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  
  // Styled Dropdown - Similar to Edit Profile
  styledDropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  styledDropdownText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
   // textAlign: "center",
    letterSpacing: 0.5,
  },
  selectedDropdownText: {
    color: "white",
    fontWeight: "500",
  },
  dropdownIcon: {
    position: "absolute",
    right: 20,
  },
  dropdownIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  
  // Styled Options Container - Similar to Edit Profile
  styledOptionsContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    marginTop: -10,
    marginBottom: 15,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  styledOptionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOptionItem: {
    backgroundColor: "#E3F2FD",
  },
  styledOptionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  selectedOptionText: {
    color: "#4864AC",
    fontWeight: "600",
  },
  
  submitButtonContainer: {
    position: "relative",
    marginTop: 20,
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    minWidth: 200,
  },
  signupButtonText: {
    color: "#4864AC",
    fontSize: 16,
    letterSpacing: 1,
  },
  signupButtonTextBold: {
    fontWeight: "800",
  },
  signupButtonTextNormal: {
    fontWeight: "800",
  },
  termsContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  linkText: {
    textDecorationLine: "underline",
  },
  copyrightContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  copyrightText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

export default SignupScreen;