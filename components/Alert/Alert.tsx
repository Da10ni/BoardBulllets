import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlertPopupProps {
  alertVisible: boolean;
  setAlertVisible: (visible: boolean) => void;
  alertTitle: string;
  onSuccess?: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  alertVisible,
  setAlertVisible,
  alertTitle,
  onSuccess,
}) => {
  const handleOk = () => {
    setAlertVisible(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Modal
      visible={alertVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setAlertVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertModal}>
          {/* Alert Title */}
          <Text style={styles.alertTitle}>ALERT</Text>

          {/* Alert Message */}
          <Text style={styles.alertMessage}>{alertTitle}</Text>

          {/* OK Button - Full width */}
          <TouchableOpacity style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertModal: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingTop: 25,
    paddingBottom: 0,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  alertMessage: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  okButton: {
    backgroundColor: "#8A8A8A",
    width: "100%",
    paddingVertical: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  okButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AlertPopup;
