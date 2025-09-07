import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FloatingAIButtonProps {
  onPress: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onPress }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating animation exactly like in HTML
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const handlePress = () => {
    // Scale animation on press like in HTML
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();

    onPress();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            { translateY: floatAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#ec4899', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.icon}>🤖</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>AI помощник</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Positioned above bottom navigation like in original
    right: 24,
    zIndex: 1000,
  },
  buttonContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 20,
    color: '#ffffff',
  },
  tooltip: {
    position: 'absolute',
    top: -48,
    right: 0,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    opacity: 0,
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});