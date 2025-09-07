import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const quickQuestions = [
  { id: '1', text: 'Можно ли мне пить кофе?', category: 'nutrition' },
  { id: '2', text: 'Нормально ли, что болит спина?', category: 'health' },
  { id: '3', text: 'Какие упражнения безопасны?', category: 'exercise' },
  { id: '4', text: 'Что делать при токсикозе?', category: 'symptoms' },
];

const popularTopics = [
  { id: '1', emoji: '🍎', text: 'Питание' },
  { id: '2', emoji: '🧘‍♀️', text: 'Йога' },
  { id: '3', emoji: '😴', text: 'Сон' },
  { id: '4', emoji: '👶', text: 'Малыш' },
  { id: '5', emoji: '💊', text: 'Витамины' },
];

const aiResponses = [
  "Отличный вопрос! На 23 неделе это абсолютно нормально. Рекомендую больше отдыхать и следить за питанием. 💕",
  "Я понимаю твои переживания. В этот период многие мамочки сталкиваются с подобным. Попробуй расслабляющие упражнения. 🤗",
  "Это замечательно, что ты следишь за своим здоровьем! Продолжай в том же духе и не забывай про витамины. ✨",
  "Каждая беременность уникальна, но твои ощущения звучат вполне типично для этого срока. Если что-то беспокоит, лучше проконсультироваться с врачом. 👩‍⚕️",
  "Прекрасно, что ты заботишься о малыше! В этот период особенно важно слушать свое тело и не перегружаться. 🌸",
];

interface AIChatScreenProps {
  onGoBack?: () => void;
}

export const AIChatScreen: React.FC<AIChatScreenProps> = ({ onGoBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет, солнышко! ✨ Я Maya, и я здесь, чтобы поддержать тебя на каждом этапе беременности. О чем хочешь поговорить?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Show typing indicator
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      isUser: false,
      timestamp: new Date(),
      isTyping: true,
    };

    setTimeout(() => {
      setMessages(prev => [...prev, typingMessage]);
    }, 500);

    // Send AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => prev.filter(m => m.id !== 'typing').concat(aiMessage));
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleTopicPress = (topic: string) => {
    sendMessage(`Расскажи мне про ${topic.toLowerCase()} во время беременности`);
  };

  const startVoiceRecording = () => {
    setShowVoiceModal(true);
    setIsRecording(true);
    
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    setShowVoiceModal(false);
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    
    // Simulate voice message
    sendMessage("Привет Maya! Я записала голосовое сообщение о своих ощущениях на 23 неделе.");
  };

  const cancelVoiceRecording = () => {
    setIsRecording(false);
    setShowVoiceModal(false);
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = (message: Message) => {
    if (message.isTyping) {
      return (
        <View key={message.id} style={styles.messageContainer}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>🤖</Text>
          </View>
          <View style={styles.aiMessageBubble}>
            <View style={styles.typingIndicator}>
              <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
              <View style={[styles.typingDot, { animationDelay: '200ms' }]} />
              <View style={[styles.typingDot, { animationDelay: '400ms' }]} />
            </View>
            <Text style={styles.typingText}>Maya печатает...</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={message.id} style={styles.messageContainer}>
        {!message.isUser && (
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>🤖</Text>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          message.isUser ? styles.userMessageBubble : styles.aiMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            message.isUser ? styles.userMessageText : styles.aiMessageText
          ]}>
            {message.text}
          </Text>
          <Text style={styles.messageTime}>
            {message.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        {message.isUser && (
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onGoBack}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.mayaAvatar}>
            <Text style={styles.mayaAvatarText}>✨</Text>
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Maya AI</Text>
            <View style={styles.onlineStatus}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Всегда рядом</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Привет, солнышко! ✨</Text>
        <Text style={styles.welcomeText}>
          Я Maya - твой умный помощник в материнстве. Готова поддержать тебя на каждом шаге!
        </Text>
      </View>

      {/* Quick Questions */}
      <View style={styles.quickQuestionsSection}>
        <Text style={styles.sectionTitle}>⚡ Быстрые ответы</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickQuestionsContainer}>
            {quickQuestions.map(question => (
              <TouchableOpacity
                key={question.id}
                style={styles.quickQuestionButton}
                onPress={() => handleQuickQuestion(question.text)}
              >
                <Text style={styles.quickQuestionText}>{question.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Popular Topics */}
      <View style={styles.topicsSection}>
        <Text style={styles.sectionTitle}>🔥 Популярные темы</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.topicsContainer}>
            {popularTopics.map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={styles.topicButton}
                onPress={() => handleTopicPress(topic.text)}
              >
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Text style={styles.topicText}>{topic.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Input Section */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputSection}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachButtonText}>📎</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Поделись своими мыслями..."
            placeholderTextColor="#9ca3af"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={startVoiceRecording}
          >
            <Text style={styles.voiceButtonText}>🎤</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>✈️</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Voice Recording Modal */}
      <Modal
        visible={showVoiceModal}
        transparent
        animationType="fade"
        onRequestClose={cancelVoiceRecording}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.voiceModal}>
            <Animated.View style={[styles.voicePulse, { transform: [{ scale: pulseAnim }] }]}>
              <Text style={styles.voicePulseText}>🎤</Text>
            </Animated.View>
            <Text style={styles.voiceModalTitle}>Слушаю тебя... 👂</Text>
            <Text style={styles.voiceModalSubtitle}>Говори спокойно, я всё пойму</Text>
            
            <View style={styles.voiceModalButtons}>
              <TouchableOpacity 
                style={styles.voiceCancelButton}
                onPress={cancelVoiceRecording}
              >
                <Text style={styles.voiceCancelText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.voiceStopButton}
                onPress={stopVoiceRecording}
              >
                <Text style={styles.voiceStopText}>Готово ✨</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f0fdfa',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#059669',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  mayaAvatar: {
    width: 44,
    height: 44,
    backgroundColor: '#ec4899',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mayaAvatarText: {
    fontSize: 20,
    color: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
    marginRight: 4,
  },
  onlineText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  menuButton: {
    width: 36,
    height: 36,
    backgroundColor: '#fef3f2',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    color: '#ec4899',
  },
  welcomeSection: {
    backgroundColor: '#fef7f0',
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickQuestionsSection: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  quickQuestionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickQuestionButton: {
    backgroundColor: '#fdf2f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#fbcfe8',
  },
  quickQuestionText: {
    fontSize: 12,
    color: '#be185d',
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#ec4899',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    fontSize: 16,
    color: '#ffffff',
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#6b7280',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  userAvatarText: {
    fontSize: 16,
    color: '#ffffff',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  userMessageBubble: {
    backgroundColor: '#fdf2f8',
    borderBottomRightRadius: 6,
    marginLeft: 'auto',
  },
  aiMessageBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 6,
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#1f2937',
  },
  aiMessageText: {
    color: '#1f2937',
  },
  messageTime: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    backgroundColor: '#9ca3af',
    borderRadius: 3,
    marginRight: 3,
  },
  typingText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  topicsSection: {
    padding: 16,
    backgroundColor: '#f0fdfa',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  topicsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  topicButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a7f3d0',
    minWidth: 70,
  },
  topicEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  topicText: {
    fontSize: 10,
    color: '#065f46',
    fontWeight: '500',
  },
  inputSection: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  attachButton: {
    width: 36,
    height: 36,
    backgroundColor: '#10b981',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachButtonText: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  voiceButton: {
    width: 36,
    height: 36,
    backgroundColor: '#ec4899',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButtonText: {
    fontSize: 16,
  },
  sendButton: {
    width: 36,
    height: 36,
    backgroundColor: '#9ca3af',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#3b82f6',
  },
  sendButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceModal: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
    elevation: 10,
  },
  voicePulse: {
    width: 112,
    height: 112,
    backgroundColor: '#ec4899',
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  voicePulseText: {
    fontSize: 48,
    color: '#ffffff',
  },
  voiceModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  voiceModalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  voiceModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  voiceCancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  voiceCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  voiceStopButton: {
    flex: 1,
    backgroundColor: '#ec4899',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  voiceStopText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
