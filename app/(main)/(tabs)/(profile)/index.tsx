import { EvilIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
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
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                style={styles.profileImage}
              />
              
            </View>

            {/* Name and Student Info */}
            <View style={styles.nameSection}>
              <Text style={styles.userName}>JOHN DOE</Text>
              <Text style={styles.userRole}>STUDENT</Text>

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
                onPress={() => router.push("/editProfile")}
              >
                <EvilIcons name="pencil" size={40} style={styles.editIcon}/>
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
              <Text style={styles.fieldValue}>JOHN</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>LAST NAME</Text>
              <Text style={styles.fieldValue}>DOE</Text>
            </View>
          </View>

          {/* Educational Status and Specialty Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>EDUCATIONAL STATUS</Text>
              <Text style={styles.fieldValue}>STUDENT</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>SPECIALTY</Text>
              <Text style={styles.fieldValue}>GENERAL SURGERY</Text>
            </View>
          </View>

          {/* Institution */}
          <View style={styles.fullWidthField}>
            <Text style={styles.fieldLabel}>INSTITUTION</Text>
            <Text style={styles.fieldValue}>
              INTERNATIONAL AMERICAN UNIVERSITY
            </Text>
          </View>

          {/* Country of Residence */}
          <View style={styles.fullWidthField}>
            <Text style={styles.fieldLabel}>COUNTRY OF RESIDENCE</Text>
            <Text style={styles.fieldValue}>USA</Text>
          </View>

          {/* Date of Birth and Gender Row */}
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
              <Text style={styles.fieldValue}>02-27-1993</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.fieldLabel}>GENDER</Text>
              <Text style={styles.fieldValue}>MALE</Text>
            </View>
          </View>

          {/* Date of Graduation */}
          <View style={styles.fullWidthField}>
            <Text style={styles.fieldLabel}>DATE OF GRADUATION</Text>
            <Text style={styles.fieldValue}>11-2014</Text>
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
    right: 5,
    //top: 15,
   // width: 30,
    //height: 30,
    transform: [{ skewY: "-180deg" }],
   // backgroundColor: "#999",
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
    //marginTop:5,
  },
  nameSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 20,
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