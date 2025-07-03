import AlertPopup from "@/components/Alert/Alert";
import { useAuth } from "@/utils/axiosInstance";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [rememberMe, setRememberMe] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        setLoading(false);
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const res = await login({
        email,
        password,
      });

      console.log("check token in login", res?.token);
      if (res?.success) {
        setLoading(false);
        if (res.token) {
          await AsyncStorage.setItem("userToken", res?.token);
        }

        // ✅ Immediately navigate to home
        router.replace("/(main)/(tabs)/(home)");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forget-password");
  };

  const handleSignup = () => {
    router.push("/register");
  };

  const handleGoBack = () => {
    router.back();
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <AlertPopup
        alertTitle="Login Successfull !!"
        setAlertVisible={setShowAlert}
        alertVisible={showAlert}
        onSuccess={() => router.replace("/(main)/(tabs)/(home)")}
      />

      {/* Diagonal White Background */}
      <View style={styles.whiteBackground} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitleBold}>B4 </Text>
          <Text style={styles.headerTitleNormal}>AI</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.headerSubtitleBold}>Learn</Text>
          <Text style={styles.headerSubtitleNormal}> & Earn</Text>
        </View>
      </View>

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={45} color="#4864AC" />
        </View>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>LOG IN</Text>
          <Text style={styles.subtitle}>
            PLEASE ENTER THE EMAIL ADDRESS ASSOCIATED WITH YOUR B4 AI ACCOUNT.
          </Text>

          <View style={[styles.inputContainer, { marginTop: 30 }]}></View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="rgba(255, 255, 255, 0.7)"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="EMAIL ADDRESS"
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
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={toggleRememberMe}
            activeOpacity={0.7}
          >
            <View style={styles.checkboxContainer}>
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={12} color="#4864AC" />
                )}
              </View>
            </View>
            <Text style={styles.rememberMeText}>REMEMBER ME</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.loginButtonText}>LOG IN</Text>
            )}
          </TouchableOpacity>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupLink}>CREATE AN ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>FORGOT PASSWORD ? </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.copyright}>
            <Text style={styles.statement}>
              COPYRIGHT (C) 2017 BOARDBULLETS,INC.
            </Text>
            <Text style={styles.policy}>PRIVACY POLICY AND TERMS OF USE</Text>
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
    top: -170,
    left: 40,
    width: 50,
    height: 570,
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 105,
  },
  headerTitleBold: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerTitleNormal: {
    color: "white",
    fontSize: 25,
    fontWeight: "200",
    letterSpacing: 1,
  },
  backButtonText: {
    color: "#4A90E2",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 120,
    marginTop: 5,
  },
  headerSubtitleBold: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubtitleNormal: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
  },
  iconContainer: {
    alignItems: "center",
    marginTop: "22%",
    right: "3%",
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "normal",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 20,
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
    marginRight: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPasswordText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#4864AC",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  signupLink: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "white",
    borderColor: "white",
  },
  rememberMeText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  copyright: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  statement: {
    color: "#ebeae8",
    fontSize: 10,
  },
  policy: {
    color: "#ebeae8",
    fontSize: 10,
  },
});

export default LoginScreen;
