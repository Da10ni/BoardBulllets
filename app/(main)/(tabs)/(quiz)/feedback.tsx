import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';

const FeedbackPopup = ({ visible, onClose, onSubmit }) => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [customFeedback, setCustomFeedback] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  const feedbackOptions = [
    { id: 'spelling', label: 'CHECK SPELLING' },
    { id: 'grammar', label: 'CHECK GRAMMAR' },
    { id: 'content', label: 'CONTENT REVIEW' },
    { id: 'other', label: 'OTHER:' }
  ];

  const handleFeedbackSelect = (option) => {
    setSelectedFeedback(option);
  };

  const handleSubmit = () => {
    if (!selectedFeedback) {
      Alert.alert('Error', 'Please select a feedback option');
      return;
    }
    
    const feedbackData = {
      type: selectedFeedback,
      customText: selectedFeedback === 'other' ? customFeedback : '',
      additionalComments: additionalComments
    };
    
    // Call parent submit function
    onSubmit(feedbackData);
    
    // Reset form
    resetForm();
    
    // Close modal
    onClose();
    
    Alert.alert('Success', 'Feedback submitted successfully!');
  };

  const resetForm = () => {
    setSelectedFeedback('');
    setCustomFeedback('');
    setAdditionalComments('');
    setIsPressed(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>FEEDBACK</Text>
          </View>

          {/* Feedback Options Grid */}
          <View style={styles.optionsGrid}>
            {feedbackOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleFeedbackSelect(option.id)}
                style={[
                  styles.optionButton,
                  selectedFeedback === option.id && (
                    option.id === 'other' ? styles.selectedOtherButton : styles.selectedButton
                  )
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedFeedback === option.id && styles.selectedText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Text Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                selectedFeedback !== 'other' && styles.disabledInput
              ]}
              placeholder="Enter feedback..."
              placeholderTextColor="#999"
              value={selectedFeedback === 'other' ? customFeedback : ''}
              onChangeText={setCustomFeedback}
              editable={selectedFeedback === 'other'}
            />
            
            <TextInput
              style={styles.textInput}
              placeholder="Additional comments..."
              placeholderTextColor="#999"
              value={additionalComments}
              onChangeText={setAdditionalComments}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={[
                styles.submitButton,
                isPressed && styles.submitButtonPressed
              ]}
            >
              <Text style={[
                styles.submitText,
                isPressed && styles.submitTextPressed
              ]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 350,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1.5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#9ca3af',
  },
  selectedOtherButton: {
    backgroundColor: '#3b82f6',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  selectedText: {
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  submitButton: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomRightRadius: 24,
    marginLeft: 8,
  },
  submitButtonPressed: {
    backgroundColor: '#f3f4f6',
  },
  submitText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  submitTextPressed: {
    color: '#000000',
  },
});

export default FeedbackPopup;