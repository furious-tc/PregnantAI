import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { AIChatScreen } from '../../features/ai/screens/AIChatScreen';

interface AIChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <AIChatScreen onGoBack={onClose} />
    </Modal>
  );
};
