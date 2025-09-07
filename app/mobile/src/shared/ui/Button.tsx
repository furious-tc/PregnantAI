import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-pink-500 to-purple-600 active:from-pink-600 active:to-purple-700';
      case 'secondary':
        return 'bg-gray-100 active:bg-gray-200';
      case 'outline':
        return 'border-2 border-pink-500 bg-transparent active:bg-pink-50';
      case 'ghost':
        return 'bg-transparent active:bg-gray-100';
      default:
        return 'bg-gradient-to-r from-pink-500 to-purple-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 rounded-lg';
      case 'md':
        return 'px-4 py-3 rounded-xl';
      case 'lg':
        return 'px-6 py-4 rounded-2xl';
      default:
        return 'px-4 py-3 rounded-xl';
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold text-center';
    const sizeStyles = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
    const colorStyles = variant === 'primary' ? 'text-white' : 
                       variant === 'secondary' ? 'text-gray-800' : 
                       variant === 'outline' ? 'text-pink-600' : 'text-gray-700';
    return `${baseStyles} ${sizeStyles} ${colorStyles}`;
  };

  const buttonStyles = `
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50' : ''}
    shadow-lg
    ${className}
  `;

  return (
    <StyledTouchableOpacity
      className={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center space-x-2">
        {loading ? (
          <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : '#6B7280'} />
        ) : (
          <>
            {icon && icon}
            <StyledText className={getTextStyles()}>{title}</StyledText>
          </>
        )}
      </View>
    </StyledTouchableOpacity>
  );
};
