// components/Dropdown/Dropdown.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styles } from './dropdown.styles';
interface DropdownProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ visible, onClose, onOptionSelect }) => {
  if (!visible) return null;

  const handleOptionPress = (option: string) => {
    onOptionSelect(option);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />
      
      {/* Dropdown Menu */}
      <View style={styles.dropdown}>
        <TouchableOpacity 
          style={styles.dropdownItem}
          onPress={() => handleOptionPress('settings')}
        >
          <Text style={styles.dropdownText}>SETTINGS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dropdownItem}
          onPress={() => handleOptionPress('review')}
        >
          <Text style={styles.dropdownText}>SUBMIT A REVIEW</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dropdownItem}
          onPress={() => handleOptionPress('terms')}
        >
          <Text style={styles.dropdownText}>TERMS & CONDITIONS</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Dropdown;