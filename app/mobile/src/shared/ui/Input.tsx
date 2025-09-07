import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  type = 'text',
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(type === 'password');

  const getInputStyles = () => {
    const baseStyles = 'flex-1 px-4 py-3 text-base text-gray-800 font-medium';
    const borderStyles = isFocused 
      ? 'border-2 border-pink-500' 
      : error 
      ? 'border-2 border-red-500' 
      : 'border-2 border-gray-200';
    const backgroundStyles = disabled ? 'bg-gray-100' : 'bg-white';
    
    return `${baseStyles} ${borderStyles} ${backgroundStyles} rounded-xl`;
  };

  const handleToggleSecureEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <StyledView className={`space-y-2 ${className}`}>
      {label && (
        <StyledText className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </StyledText>
      )}
      
      <StyledView className="relative">
        <StyledView className="flex-row items-center">
          {leftIcon && (
            <StyledView className="absolute left-3 z-10">
              {leftIcon}
            </StyledView>
          )}
          
          <StyledTextInput
            className={`${getInputStyles()} ${leftIcon ? 'pl-12' : ''} ${rightIcon || type === 'password' ? 'pr-12' : ''}`}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isSecureTextEntry}
            keyboardType={
              type === 'email' ? 'email-address' : 
              type === 'number' ? 'numeric' : 'default'
            }
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={!disabled}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
          
          {(rightIcon || type === 'password') && (
            <StyledTouchableOpacity
              className="absolute right-3 z-10 p-1"
              onPress={type === 'password' ? handleToggleSecureEntry : undefined}
            >
              {type === 'password' ? (
                <StyledText className="text-gray-500">
                  {isSecureTextEntry ? '👁️' : '🙈'}
                </StyledText>
              ) : (
                rightIcon
              )}
            </StyledTouchableOpacity>
          )}
        </StyledView>
      </StyledView>
      
      {error && (
        <StyledText className="text-sm text-red-500 ml-1">
          {error}
        </StyledText>
      )}
    </StyledView>
  );
};
