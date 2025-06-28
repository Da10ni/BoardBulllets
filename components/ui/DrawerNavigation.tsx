import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomDrawerHeader = ({ title = "BOARDBULLETS" }) => {
  const router = useRouter();
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const optionsButtonRef = useRef(null);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleOptionsPress = () => {
    optionsButtonRef.current?.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({
        top: py + height - 10,
        right: Dimensions.get("window").width - px - width,
      });
      setShowDropdown(true);
    });
  };

  const handleDropdownItemPress = (action) => {
    setShowDropdown(false);

    switch (action) {
      case "settings":
        // Navigate to settings or handle settings action
        console.log("Settings pressed");
        // router.push('/settings');
        break;
      case "submit-review":
        // Navigate to submit review or handle action
        console.log("Submit a Review pressed");
        // router.push('/submit-review');
        break;
      case "terms":
        // Navigate to terms or handle action
        console.log("Terms & Conditions pressed");
        // router.push('/terms');
        break;
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={handleMenuPress}
        activeOpacity={0.7}
      >
        <View style={styles.hamburgerContainer}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        ref={optionsButtonRef}
        style={styles.optionsButton}
        onPress={handleOptionsPress}
        activeOpacity={0.7}
      >
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>

      {/* Dropdown Menu Modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <View
            style={[
              styles.dropdownContainer,
              {
                top: dropdownPosition.top,
                right: dropdownPosition.right,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleDropdownItemPress("settings")}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText}>SETTINGS</Text>
            </TouchableOpacity>

            <View style={styles.dropdownSeparator} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleDropdownItemPress("submit-review")}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText}>SUBMIT A REVIEW</Text>
            </TouchableOpacity>

            <View style={styles.dropdownSeparator} />

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleDropdownItemPress("terms")}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText}>TERMS & CONDITIONS</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 8,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerContainer: {
    width: 20,
    height: 14,
    justifyContent: "space-between",
  },
  hamburgerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#6366f1",
    borderRadius: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6366f1",
    letterSpacing: 1,
    textAlign: "center",
    flex: 1,
  },
  optionsButton: {
    padding: 8,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 14,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#6366f1",
    borderRadius: 2,
    marginVertical: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minWidth: 180,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    letterSpacing: 0.5,
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },
});

export default CustomDrawerHeader;
