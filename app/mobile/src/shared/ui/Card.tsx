import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'pregnancy-pink' | 'pregnancy-mint' | 'pregnancy-sky' | 'pregnancy-beige';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = true,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pregnancy-pink':
        return 'bg-gradient-to-r from-pregnancy-pink to-white border border-pink-200';
      case 'pregnancy-mint':
        return 'bg-gradient-to-r from-pregnancy-mint to-white border border-emerald-200';
      case 'pregnancy-sky':
        return 'bg-gradient-to-r from-pregnancy-sky to-white border border-blue-200';
      case 'pregnancy-beige':
        return 'bg-gradient-to-r from-pregnancy-beige to-white border border-orange-200';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const cardStyles = `
    ${getVariantStyles()}
    ${getPaddingStyles()}
    rounded-2xl
    ${shadow ? 'shadow-lg' : ''}
    ${className}
  `;

  return (
    <StyledView className={cardStyles}>
      {children}
    </StyledView>
  );
};
