import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { Platform } from "react-native";

// Types for API responses (matching your backend structure)
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Auth related types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword: string;
}

interface VerifyEmailData {
  email: string;
  verificationCode: string;
}

interface ResendCodeData {
  email: string;
}

interface User {
  _id: string;
  email: string;
  role: "admin" | "student";
  isVerified: boolean;
  profile: {
    speciality: string;
    DOG: string;
    institute: string;
    residence: string;
    profilePic?: string;
    firstName?: string;
    lastName?: string;
    DOB?: string;
    gender: "male" | "female";
  };
  createdAt: string;
}

// Registration response
interface RegisterResponse extends ApiResponse {
  email?: string;
  verificationRequired?: boolean;
}

// Verification response with user and token
interface VerificationResponse extends ApiResponse {
  user?: User;
  token?: string;
}

// Login response (only cookie set)
interface AuthResponse extends ApiResponse {
  success: boolean;
  message: string;
  token: string;
}

// Quiz related types
interface QuizQuestion {
  _id: string;
  userId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category?: string;
  subCategory?: string;
  createdAt: string;
}

interface AddQuestionData {
  userId: string;
  question: string;
}

interface AddCategoryData {
  category: string;
  subCategory: string;
}

interface AddQuestionResponse extends ApiResponse {
  data?: {
    questionId: string;
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

interface GetQuestionsResponse extends ApiResponse {
  count?: number;
  data?: QuizQuestion[];
  question?: QuizQuestion[]; // For getQuestion API response
}

const BASE_URL: string = `${process.env.EXPO_PUBLIC_API_URL}`;

// ✅ Create Axios instance with React Native specific config
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Increased timeout for mobile networks
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // ⚠️ withCredentials might cause issues in React Native
  // Only enable if you're using cookies
  // withCredentials: true,
});

// Request interceptor - runs before every request
api.interceptors.request.use(
  async (config: any) => {
    // Add auth token if available (better than cookies for React Native)
    const token = await AsyncStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header set");
    } else {
      console.log("❌ No token in AsyncStorage");
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error handling for React Native
    if (error.response) {
      const { status, data } = error.response;

      // Handle specific status codes
      switch (status) {
        case 401:
          console.warn("🔐 Authentication failed");
          // Clear stored token and redirect to login
          break;

        case 403:
          console.warn("🚫 Access forbidden");
          break;

        case 404:
          console.warn("🔍 Resource not found");
          break;

        case 409:
          console.warn("🔄 Conflict - Resource already exists");
          break;

        case 500:
          console.error("🔥 Server error");
          break;

        default:
          console.error(`🚨 HTTP Error ${status}`);
      }
    } else if (error.request) {
      // Network error - common in React Native
      console.error("🌐 Network Error:", {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          timeout: error.config?.timeout,
        },
      });
    } else {
      // Other error
      console.error("⚠️ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API methods (matching your backend endpoints)
export const authAPI = {
  // Register user
  register: (
    userData: RegisterData
  ): Promise<AxiosResponse<RegisterResponse>> =>
    api.post("/auth/register", userData),

  // Verify email with code
  verifyEmail: (
    verifyData: VerifyEmailData
  ): Promise<AxiosResponse<VerificationResponse>> =>
    api.post("/auth/verify-email", verifyData),

  // Resend verification code
  resendCode: (
    resendData: ResendCodeData
  ): Promise<AxiosResponse<ApiResponse>> =>
    api.post("/auth/resend-verification", resendData),

  // Login user
  login: (
    credentials: LoginCredentials
  ): Promise<AxiosResponse<AuthResponse>> =>
    api.post("/auth/login", credentials),

  // Get user profile by ID (matching your backend route)
  getProfile: (
    userId: string | null
  ): Promise<AxiosResponse<ApiResponse<{ user: User }>>> =>
    api.get(`/auth/profile/${userId}`),

  // Logout
  logout: (): Promise<AxiosResponse<ApiResponse>> => api.post("/auth/logout"),
  updateProfile: (
    profileData: FormData | any
  ): Promise<AxiosResponse<ApiResponse<{ user: User }>>> =>
    api.put("/auth/update-profile", profileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

// Quiz API methods
export const quizAPI = {
  // Add new question with AI-generated options
  addQuestion: (
    questionData: AddQuestionData
  ): Promise<AxiosResponse<AddQuestionResponse>> =>
    api.post("/quiz/add-question", questionData),

  // Add category to existing question
  addCategory: (
    questionId: string,
    categoryData: AddCategoryData
  ): Promise<AxiosResponse<ApiResponse<QuizQuestion>>> =>
    api.patch(`/quiz/add-category/${questionId}`, categoryData),

  // Get all questions for a user
  getUserQuestions: (
    userId: string
  ): Promise<AxiosResponse<GetQuestionsResponse>> =>
    api.get(`/quiz/user/${userId}`),

  // ✅ NEW: Get questions from other users (not created by current user)
  getQuestion: (): Promise<AxiosResponse<GetQuestionsResponse>> =>
    api.get("/quiz/get-question"),
};

// Generic API methods with types
export const apiMethods = {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.get(url, config),

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.post(url, data, config),

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.put(url, data, config),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.patch(url, data, config),

  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.delete(url, config),
};

// Error handler helper
export const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    const data = error.response.data as any;
    return data?.message || `HTTP Error ${error.response.status}`;
  } else if (error.request) {
    return "Network error - please check your connection and server status";
  } else {
    return error.message || "An unexpected error occurred";
  }
};

// Usage example for your auth flow
export const useAuth = () => {
  const handleRegister = async (userData: RegisterData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          email: response.data.email,
          verificationRequired: response.data.verificationRequired,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleVerifyEmail = async (verifyData: VerifyEmailData) => {
    try {
      const response = await authAPI.verifyEmail(verifyData);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          user: response.data.user,
          token: response.data.token,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleResendCode = async (resendData: ResendCodeData) => {
    try {
      const response = await authAPI.resendCode(resendData);
      if (response.data.success) {
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.data.success && response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        console.log("✅ Token stored after login");

        return {
          success: true,
          message: response.data.message,
          token: response.data.token,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleGetProfile = async (userId: string | null) => {
    try {
      const response = await authAPI.getProfile(userId);
      if (response.data.success) {
        return { success: true, user: response.data.data?.user };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleUpdateProfile = async (profileData: any) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          user: response.data.data?.user,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleLogout = async () => {
    try {
      const response = await authAPI.logout();
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  return {
    register: handleRegister,
    verifyEmail: handleVerifyEmail,
    resendCode: handleResendCode,
    login: handleLogin,
    updateProfile: handleUpdateProfile,
    getProfile: handleGetProfile,
    logout: handleLogout,
  };
};

// Quiz hook for easy usage
export const useQuiz = () => {
  const handleAddQuestion = async (questionData: AddQuestionData) => {
    try {
      const response = await quizAPI.addQuestion(questionData);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleAddCategory = async (
    questionId: string,
    categoryData: AddCategoryData
  ) => {
    try {
      const response = await quizAPI.addCategory(questionId, categoryData);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  const handleGetUserQuestions = async (userId: string) => {
    try {
      const response = await quizAPI.getUserQuestions(userId);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          count: response.data.count,
          data: response.data.data,
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  // ✅ NEW: Handle getQuestion API call
  const handleGetQuestion = async () => {
    try {
      const response = await quizAPI.getQuestion();
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message,
          question: response.data.question, // Backend returns 'question' field
        };
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      return { success: false, message: errorMessage };
    }
  };

  return {
    addQuestion: handleAddQuestion,
    addCategory: handleAddCategory,
    getUserQuestions: handleGetUserQuestions,
    getQuestion: handleGetQuestion, // ✅ NEW function
  };
};

// Export types for use in components
export type {
  ApiResponse,
  LoginCredentials,
  RegisterData,
  VerifyEmailData,
  ResendCodeData,
  User,
  RegisterResponse,
  VerificationResponse,
  AuthResponse,
  QuizQuestion,
  AddQuestionData,
  AddCategoryData,
  AddQuestionResponse,
  GetQuestionsResponse,
  AxiosError,
  AxiosResponse,
};

export default api;
