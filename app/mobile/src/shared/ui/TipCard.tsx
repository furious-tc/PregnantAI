import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { Card } from './Card';

const StyledView = styled(View);
const StyledText = styled(Text);

interface TipCardProps {
  title: string;
  text: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mental';
  icon?: string;
}

export const TipCard: React.FC<TipCardProps> = ({ title, text, category, icon }) => {
  const getCategoryVariant = () => {
    switch (category) {
      case 'nutrition':
        return 'pregnancy-pink';
      case 'exercise':
        return 'pregnancy-mint';
      case 'sleep':
        return 'pregnancy-sky';
      case 'mental':
        return 'pregnancy-beige';
      default:
        return 'default';
    }
  };

  const getCategoryIconBg = () => {
    switch (category) {
      case 'nutrition':
        return 'bg-pink-100';
      case 'exercise':
        return 'bg-emerald-100';
      case 'sleep':
        return 'bg-blue-100';
      case 'mental':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getCategoryIconColor = () => {
    switch (category) {
      case 'nutrition':
        return 'text-pink-600';
      case 'exercise':
        return 'text-emerald-600';
      case 'sleep':
        return 'text-blue-600';
      case 'mental':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getDefaultIcon = () => {
    switch (category) {
      case 'nutrition':
        return '🍎';
      case 'exercise':
        return '🏃‍♀️';
      case 'sleep':
        return '😴';
      case 'mental':
        return '🧘‍♀️';
      default:
        return '💡';
    }
  };

  return (
    <Card variant={getCategoryVariant()}>
      <StyledView className="flex-row items-start space-x-3">
        <StyledView className={`w-10 h-10 ${getCategoryIconBg()} rounded-full flex items-center justify-center flex-shrink-0`}>
          <StyledText className={`text-sm ${getCategoryIconColor()}`}>
            {icon || getDefaultIcon()}
          </StyledText>
        </StyledView>
        <StyledView className="flex-1">
          <StyledText className="text-base font-semibold text-gray-800 mb-1">
            {title}
          </StyledText>
          <StyledText className="text-sm text-gray-600 leading-relaxed">
            {text}
          </StyledText>
        </StyledView>
      </StyledView>
    </Card>
  );
};
