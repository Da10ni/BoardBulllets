import { useAuth } from "@/utils/axiosInstance";
import { EvilIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { getProfile } = useAuth();

  // ✅ Date formatting function
  const formatDate = (dateString: string): string => {
    if (!dateString) return "NOT SET";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }

      // Format as DD-MM-YYYY
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      console.log("Date formatting error:", error);
      return dateString; // Return original if error
    }
  };

  // ✅ Get User ID from Token
  const getUserId = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.log("No token found");
        return null;
      }

      // Token decode karo
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const tokenData = JSON.parse(decodedPayload);
      return tokenData.userId;
    } catch (error) {
      console.log("❌ Error getting user ID:", error);
      return null;
    }
  };

  // ✅ Get User Profile Data
  const getUserData = async (id: string) => {
    try {
      const res = await getProfile(id);

      if (res?.success && res?.user) {
        setUserData(res.user);
      } else {
        console.log("❌ Failed to get profile:", res);
      }
    } catch (error) {
      console.log("❌ Error fetching profile:", error);
    }
  };

  // ✅ Initial Load - Get User ID
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // ✅ Auto-refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        getUserData(userId);
      }
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YOUR PROFILE</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            {/* Profile Image and Edit Button */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri:
                    userData?.profile?.profilePic ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                style={styles.profileImage}
              />
            </View>

            {/* Name and Student Info */}
            <View style={styles.nameSection}>
              <Text style={styles.userName}>
                {userData?.profile?.firstName && userData?.profile?.lastName
                  ? `${userData.profile.firstName.toUpperCase()} ${userData.profile.lastName.toUpperCase()}`
                  : "JOHN DOE"}
              </Text>
              <Text style={styles.userRole}>
                {userData?.role?.toUpperCase() || "STUDENT"}
              </Text>

              {/* Social Media Icons */}
              <View style={styles.socialIcons}>
                <TouchableOpacity
                  style={[styles.socialIcon, styles.facebookIcon]}
                >
                  <Icon name="facebook" size={18} color="#4864AC" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialIcon, styles.twitterIcon]}
                >
                  <Icon name="twitter" size={18} color="#4864AC" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialIcon, styles.instagramIcon]}
                >
                  <Icon name="instagram" size={18} color="#4864AC" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname: "/editProfile",
                    params: { userId: userData?._id },
                  })
                }
              >
                <EvilIcons name="pencil" size={40} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          {/* First Name and Last Name Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>FIRST NAME</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.firstName?.toUpperCase() || "JOHN"}
              </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>LAST NAME</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.lastName?.toUpperCase() || "DOE"}
              </Text>
            </View>
          </View>

          {/* Educational Status and Specialty Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>EDUCATIONAL STATUS</Text>
              <Text style={styles.fieldValue}>
                {userData?.role?.toUpperCase() || "STUDENT"}
              </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>SPECIALTY</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.speciality?.toUpperCase() || "NOT SET"}
              </Text>
            </View>
          </View>

          <View style={styles.fullWidth}>
            {/* Institution */}
            <View style={styles.fullWidthField}>
              <Text style={styles.fieldLabel}>INSTITUTION</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.institute?.toUpperCase() || "NOT SET"}
              </Text>
            </View>

            {/* Country of Residence */}
            <View style={styles.fullWidthField}>
              <Text style={styles.fieldLabel}>COUNTRY OF RESIDENCE</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.residence?.toUpperCase() || "NOT SET"}
              </Text>
            </View>
          </View>

          {/* Date of Birth and Gender Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
              <Text style={styles.fieldValue}>
                {formatDate(userData?.profile?.DOB)}
              </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>GENDER</Text>
              <Text style={styles.fieldValue}>
                {userData?.profile?.gender?.toUpperCase() || "MALE"}
              </Text>
            </View>
          </View>

          {/* Date of Graduation */}
          <View style={styles.fullWidthField}>
            <Text style={styles.fieldLabel}>DATE OF GRADUATION</Text>
            <Text style={styles.fieldValue}>
              {formatDate(userData?.profile?.DOG)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4864AC",
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4864AC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
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
  profileSection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    right: -20,
    transform: [{ skewY: "-180deg" }],
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editIcon: {
    color: "#000",
  },
  nameSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  userRole: {
    fontSize: 14,
    color: "#999",
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  socialIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  facebookIcon: {
    borderColor: "#4864AC",
  },
  twitterIcon: {
    borderColor: "#4864AC",
  },
  instagramIcon: {
    borderColor: "#4864AC",
  },
  detailsContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 25,
    gap: 20,
  },
  detailColumn: {
    flex: 1,
  },
  fullWidth : {
    width: '100%',
    flex : 1,
    flexDirection: "row",
    justifyContent : "space-between"
  },
  fullWidthField: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#4864AC",
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default ProfileScreen;
