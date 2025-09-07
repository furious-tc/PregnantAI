import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setOnboardingCompleted } from '../../../shared/store/authSlice';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  name?: string;
  week?: number;
  trimester?: number;
  day?: number;
  dueDate?: string;
  isFirstPregnancy?: boolean;
  interests: string[];
}

export const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({ interests: [] });
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Animations
  const bounceAnim = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    // Reset animations for each screen
    bounceAnim.setValue(0.3);
    fadeAnim.setValue(0);

    // Bounce animation for images
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false,
      }),
    ]).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Update progress
    updateProgress(currentScreen);
  }, [currentScreen]);

  const updateProgress = (step: number) => {
    const progress = step / 4;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const nextScreen = () => {
    if (currentScreen < 4) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setShowRegistration(true);
    }
  };

  const skipOnboarding = () => {
    setShowRegistration(true);
  };

  const toggleInterest = (interest: string) => {
    const interests = onboardingData.interests;
    if (interests.includes(interest)) {
      setOnboardingData({
        ...onboardingData,
        interests: interests.filter(i => i !== interest)
      });
    } else {
      setOnboardingData({
        ...onboardingData,
        interests: [...interests, interest]
      });
    }
  };

  const completeRegistration = () => {
    if (!onboardingData.name?.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите ваше имя');
      return;
    }
    setShowRegistration(false);
    setShowSubscription(true);
  };

  const selectSubscription = (type: 'free' | 'premium') => {
    setShowSubscription(false);
    setShowPermissions(true);
  };

  const continueWithPermissions = () => {
    setShowPermissions(false);
    setShowTutorial(true);
  };

  const finishTutorial = () => {
    setShowTutorial(false);
    setShowLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Complete onboarding and go to main app
      dispatch(setOnboardingCompleted(true));
    }, 3000);
  };

  const getStepTitle = () => {
    const titles = ['Добро пожаловать', 'AI помощник', 'Отслеживание', 'Сообщество'];
    return titles[currentScreen - 1];
  };

  // Loading screen
  if (showLoading) {
    return (
      <LinearGradient
        colors={['#f0fdfa', '#f0f9ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullScreen}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingImageContainer, { transform: [{ scale: bounceAnim }] }]}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/227c1724ab-483bb96c93af42f3d2b0.png' }}
              style={styles.loadingImage}
              resizeMode="cover"
            />
          </Animated.View>

          <Text style={styles.loadingTitle}>Готовим все для тебя...</Text>
          <Text style={styles.loadingSubtitle}>
            Персонализируем контент и настраиваем рекомендации под твой срок беременности.
          </Text>

          <View style={styles.loadingBars}>
            <View style={styles.loadingBarItem}>
              <View style={styles.loadingBarHeader}>
                <Text style={styles.loadingBarTitle}>Загружаем информацию о 23-й неделе</Text>
                <Text style={styles.loadingBarPercent}>100%</Text>
              </View>
              <View style={styles.loadingBarTrack}>
                <View style={[styles.loadingBarFill, { width: '100%', backgroundColor: '#059669' }]} />
              </View>
            </View>

            <View style={styles.loadingBarItem}>
              <View style={styles.loadingBarHeader}>
                <Text style={styles.loadingBarTitle}>Настраиваем AI помощника</Text>
                <Text style={styles.loadingBarPercent}>85%</Text>
              </View>
              <View style={styles.loadingBarTrack}>
                <View style={[styles.loadingBarFill, { width: '85%', backgroundColor: '#2563eb' }]} />
              </View>
            </View>

            <View style={styles.loadingBarItem}>
              <View style={styles.loadingBarHeader}>
                <Text style={styles.loadingBarTitle}>Подбираем сообщества</Text>
                <Text style={styles.loadingBarPercent}>70%</Text>
              </View>
              <View style={styles.loadingBarTrack}>
                <View style={[styles.loadingBarFill, { width: '70%', backgroundColor: '#ec4899' }]} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Tutorial screen
  if (showTutorial) {
    return (
      <LinearGradient
        colors={['#fef7f0', '#fdf2f8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullScreen}
      >
        <SafeAreaView style={styles.tutorialContainer}>
          <View style={styles.tutorialHeader}>
            <LinearGradient
              colors={['#ec4899', '#ea580c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tutorialIcon}
            >
              <FontAwesome5 name="graduation-cap" size={24} color="#ffffff" solid />
            </LinearGradient>
            <Text style={styles.tutorialTitle}>Быстрый обзор</Text>
            <Text style={styles.tutorialSubtitle}>Узнай, как пользоваться основными функциями</Text>
          </View>

          <ScrollView style={styles.tutorialContent} showsVerticalScrollIndicator={false}>
            <View style={styles.tutorialCard}>
              <View style={styles.tutorialCardHeader}>
                <View style={styles.tutorialCardIcon}>
                  <FontAwesome5 name="home" size={16} color="#ec4899" solid />
                </View>
                <Text style={styles.tutorialCardTitle}>Главный экран</Text>
              </View>
              <Text style={styles.tutorialCardText}>
                Здесь ты увидишь информацию о развитии малыша, советы дня и чек-лист задач.
              </Text>
              <View style={styles.tutorialExample}>
                <View style={styles.tutorialExampleIcon}>
                  <FontAwesome5 name="baby" size={14} color="#ec4899" solid />
                </View>
                <Text style={styles.tutorialExampleText}>Ты на 23-й неделе</Text>
              </View>
            </View>

            <View style={styles.tutorialCard}>
              <View style={styles.tutorialCardHeader}>
                <View style={styles.tutorialCardIcon}>
                  <FontAwesome5 name="robot" size={16} color="#8b5cf6" solid />
                </View>
                <Text style={styles.tutorialCardTitle}>AI помощник</Text>
              </View>
              <Text style={styles.tutorialCardText}>
                Нажми на плавающую кнопку внизу справа, чтобы задать вопрос умному помощнику.
              </Text>
              <View style={styles.tutorialExample}>
                <Text style={styles.tutorialExampleQuestion}>Можно ли мне пить кофе?</Text>
                <View style={styles.tutorialExampleBot}>
                  <FontAwesome5 name="robot" size={12} color="#ffffff" solid />
                </View>
              </View>
            </View>

            <View style={styles.tutorialCard}>
              <View style={styles.tutorialCardHeader}>
                <View style={styles.tutorialCardIcon}>
                  <FontAwesome5 name="chart-line" size={16} color="#059669" solid />
                </View>
                <Text style={styles.tutorialCardTitle}>Трекинг</Text>
              </View>
              <Text style={styles.tutorialCardText}>
                Отмечай настроение, симптомы и движения малыша каждый день.
              </Text>
              <View style={styles.tutorialExample}>
                <Text style={styles.tutorialExampleQuestion}>Как настроение?</Text>
                <View style={styles.moodEmojis}>
                  <Text style={styles.moodEmoji}>😊</Text>
                  <Text style={styles.moodEmoji}>😌</Text>
                  <Text style={styles.moodEmoji}>😐</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.finishButton} onPress={finishTutorial}>
            <LinearGradient
              colors={['#ec4899', '#ea580c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.finishButtonGradient}
            >
              <Text style={styles.finishButtonText}>Понятно, начать пользоваться!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Permissions screen
  if (showPermissions) {
    return (
      <View style={styles.fullScreen}>
        <SafeAreaView style={styles.permissionsContainer}>
          <View style={styles.permissionsHeader}>
            <LinearGradient
              colors={['#2563eb', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.permissionsIcon}
            >
              <FontAwesome5 name="shield-alt" size={24} color="#ffffff" solid />
            </LinearGradient>
            <Text style={styles.permissionsTitle}>Разрешения</Text>
            <Text style={styles.permissionsSubtitle}>Помоги нам сделать приложение еще лучше</Text>
          </View>

          <ScrollView style={styles.permissionsContent} showsVerticalScrollIndicator={false}>
            <LinearGradient
              colors={['#eff6ff', '#e0f2fe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.permissionCard}
            >
              <View style={styles.permissionIcon}>
                <FontAwesome5 name="bell" size={20} color="#ffffff" solid />
              </View>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionTitle}>Уведомления</Text>
                <Text style={styles.permissionText}>
                  Получай напоминания о приеме витаминов, записи симптомов и важных событиях беременности.
                </Text>
                <TouchableOpacity style={styles.permissionButton}>
                  <Text style={styles.permissionButtonText}>Разрешить уведомления</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#f0fdf4', '#ecfdf5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.permissionCard}
            >
              <View style={[styles.permissionIcon, { backgroundColor: '#059669' }]}>
                <FontAwesome5 name="microphone" size={20} color="#ffffff" solid />
              </View>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionTitle}>Микрофон</Text>
                <Text style={styles.permissionText}>
                  Используй голосовые сообщения для общения с AI помощником - это быстрее и удобнее.
                </Text>
                <TouchableOpacity style={[styles.permissionButton, { backgroundColor: '#059669' }]}>
                  <Text style={styles.permissionButtonText}>Разрешить микрофон</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#faf5ff', '#f3e8ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.permissionCard}
            >
              <View style={[styles.permissionIcon, { backgroundColor: '#8b5cf6' }]}>
                <FontAwesome5 name="camera" size={20} color="#ffffff" solid />
              </View>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionTitle}>Камера</Text>
                <Text style={styles.permissionText}>
                  Добавляй фото в дневник беременности и делись моментами с сообществом.
                </Text>
                <TouchableOpacity style={[styles.permissionButton, { backgroundColor: '#8b5cf6' }]}>
                  <Text style={styles.permissionButtonText}>Разрешить камеру</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ScrollView>

          <View style={styles.permissionsFooter}>
            <TouchableOpacity style={styles.continueButton} onPress={continueWithPermissions}>
              <LinearGradient
                colors={['#2563eb', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueButtonGradient}
              >
                <Text style={styles.continueButtonText}>Продолжить</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={continueWithPermissions}>
              <Text style={styles.skipPermissionsText}>Пропустить (можно настроить позже)</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Subscription screen
  if (showSubscription) {
    return (
      <LinearGradient
        colors={['#f3e8ff', '#fce7f3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullScreen}
      >
        <SafeAreaView style={styles.subscriptionContainer}>
          <View style={styles.subscriptionHeader}>
            <LinearGradient
              colors={['#8b5cf6', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.subscriptionIcon}
            >
              <FontAwesome5 name="crown" size={24} color="#ffffff" solid />
            </LinearGradient>
            <Text style={styles.subscriptionTitle}>Выбери свой план</Text>
            <Text style={styles.subscriptionSubtitle}>Получи максимум от BabyJoy</Text>
          </View>

          <View style={styles.plansContainer}>
            {/* Free Plan */}
            <View style={styles.freePlan}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Базовый план</Text>
                <Text style={styles.planPrice}>Бесплатно</Text>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#059669" solid />
                  <Text style={styles.planFeatureText}>Еженедельные обновления о малыше</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#059669" solid />
                  <Text style={styles.planFeatureText}>Базовый трекинг симптомов</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#059669" solid />
                  <Text style={styles.planFeatureText}>Доступ к сообществу</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="times" size={12} color="#9ca3af" solid />
                  <Text style={[styles.planFeatureText, { color: '#9ca3af' }]}>AI помощник (ограничено)</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.freePlanButton}
                onPress={() => selectSubscription('free')}
              >
                <Text style={styles.freePlanButtonText}>Продолжить бесплатно</Text>
              </TouchableOpacity>
            </View>

            {/* Premium Plan */}
            <LinearGradient
              colors={['#8b5cf6', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumPlan}
            >
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Популярно</Text>
              </View>
              <View style={styles.planHeader}>
                <Text style={styles.premiumPlanName}>Premium план</Text>
                <View style={styles.premiumPrice}>
                  <Text style={styles.premiumPriceValue}>$9.99</Text>
                  <Text style={styles.premiumPricePeriod}>/месяц</Text>
                </View>
              </View>
              <View style={styles.planFeatures}>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                  <Text style={[styles.planFeatureText, { color: '#ffffff' }]}>Все функции базового плана</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                  <Text style={[styles.planFeatureText, { color: '#ffffff' }]}>Безлимитный AI помощник</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                  <Text style={[styles.planFeatureText, { color: '#ffffff' }]}>Детальная аналитика здоровья</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                  <Text style={[styles.planFeatureText, { color: '#ffffff' }]}>Персональные рекомендации</Text>
                </View>
                <View style={styles.planFeature}>
                  <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                  <Text style={[styles.planFeatureText, { color: '#ffffff' }]}>Эксклюзивный контент</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.premiumPlanButton}
                onPress={() => selectSubscription('premium')}
              >
                <Text style={styles.premiumPlanButtonText}>Попробовать 7 дней бесплатно</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <Text style={styles.subscriptionDisclaimer}>
            Отмена в любое время • Без скрытых платежей
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Registration screen
  if (showRegistration) {
    return (
      <View style={styles.fullScreen}>
        <SafeAreaView style={styles.registrationContainer}>
          <ScrollView contentContainerStyle={styles.registrationContent} showsVerticalScrollIndicator={false}>
            <View style={styles.registrationHeader}>
              <LinearGradient
                colors={['#ec4899', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registrationIcon}
              >
                <FontAwesome5 name="heart" size={24} color="#ffffff" solid />
              </LinearGradient>
              <Text style={styles.registrationTitle}>Расскажи о себе</Text>
              <Text style={styles.registrationSubtitle}>Это поможет нам персонализировать твой опыт</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Как тебя зовут?</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Введи свое имя"
                  placeholderTextColor="#9ca3af"
                  value={onboardingData.name || ''}
                  onChangeText={(name) => setOnboardingData({ ...onboardingData, name })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>На какой неделе беременности?</Text>
                <View style={styles.weekInputsContainer}>
                  <TextInput
                    style={styles.weekInput}
                    placeholder="1 триместр"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={onboardingData.trimester?.toString() || ''}
                    onChangeText={(text) => setOnboardingData({ ...onboardingData, trimester: parseInt(text) || undefined })}
                  />
                  <TextInput
                    style={styles.weekInput}
                    placeholder="Неделя"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={onboardingData.week?.toString() || ''}
                    onChangeText={(text) => setOnboardingData({ ...onboardingData, week: parseInt(text) || undefined })}
                  />
                  <TextInput
                    style={styles.weekInput}
                    placeholder="День"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={onboardingData.day?.toString() || ''}
                    onChangeText={(text) => setOnboardingData({ ...onboardingData, day: parseInt(text) || undefined })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Дата родов (приблизительно)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="ДД.ММ.ГГГГ"
                  placeholderTextColor="#9ca3af"
                  value={onboardingData.dueDate || ''}
                  onChangeText={(dueDate) => setOnboardingData({ ...onboardingData, dueDate })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Это твоя первая беременность?</Text>
                <View style={styles.pregnancyOptionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.pregnancyOption,
                      onboardingData.isFirstPregnancy === true && styles.selectedPregnancyOption
                    ]}
                    onPress={() => setOnboardingData({ ...onboardingData, isFirstPregnancy: true })}
                  >
                    <FontAwesome5 name="baby" size={16} color="#ec4899" solid style={styles.pregnancyOptionIcon} />
                    <Text style={styles.pregnancyOptionText}>Да, первая</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.pregnancyOption,
                      onboardingData.isFirstPregnancy === false && styles.selectedPregnancyOption
                    ]}
                    onPress={() => setOnboardingData({ ...onboardingData, isFirstPregnancy: false })}
                  >
                    <FontAwesome5 name="child" size={16} color="#ec4899" solid style={styles.pregnancyOptionIcon} />
                    <Text style={styles.pregnancyOptionText}>Нет, уже есть дети</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Что тебя больше всего интересует?</Text>
                <View style={styles.interestsGrid}>
                  {[
                    { id: 'health', icon: 'heartbeat', color: '#059669', label: 'Здоровье' },
                    { id: 'nutrition', icon: 'apple-alt', color: '#2563eb', label: 'Питание' },
                    { id: 'fitness', icon: 'dumbbell', color: '#8b5cf6', label: 'Фитнес' },
                    { id: 'preparation', icon: 'baby-carriage', color: '#ea580c', label: 'Подготовка' },
                  ].map(interest => (
                    <TouchableOpacity
                      key={interest.id}
                      style={[
                        styles.interestOption,
                        onboardingData.interests.includes(interest.id) && styles.selectedInterestOption
                      ]}
                      onPress={() => toggleInterest(interest.id)}
                    >
                      <FontAwesome5 name={interest.icon as any} size={16} color={interest.color} solid style={styles.interestIcon} />
                      <Text style={styles.interestText}>{interest.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.registrationFooter}>
              <TouchableOpacity style={styles.completeButton} onPress={completeRegistration}>
                <LinearGradient
                  colors={['#ec4899', '#8b5cf6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.completeButtonGradient}
                >
                  <Text style={styles.completeButtonText}>Завершить регистрацию</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                Нажимая "Завершить регистрацию", ты соглашаешься с{' '}
                <Text style={styles.termsLink}>Условиями использования</Text> и{' '}
                <Text style={styles.termsLink}>Политикой конфиденциальности</Text>
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  // Main onboarding screens (1-4) - БЕЗ ХЕДЕРА!
  const renderOnboardingScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <LinearGradient
            colors={['#fef7f0', '#fdf2f8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
          >
            <View style={styles.onboardingContent}>
              {/* Floating header */}
              <View style={styles.floatingHeader}>
                <View style={styles.headerLogo}>
                  <FontAwesome5 name="heart" size={14} color="#ec4899" solid />
                </View>
                <TouchableOpacity onPress={skipOnboarding}>
                  <Text style={styles.skipText}>Пропустить</Text>
                </TouchableOpacity>
              </View>

              {/* Progress bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      { 
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%']
                        })
                      }
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStep}>Шаг {currentScreen} из 4</Text>
                  <Text style={styles.progressTitle}>{getStepTitle()}</Text>
                </View>
              </View>

              {/* Content */}
              <View style={styles.screenContentContainer}>
                <Animated.View style={[styles.heroImageContainer, { transform: [{ scale: bounceAnim }] }]}>
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8a42a5716e-f2f6be344a51add23326.png' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Animated.View style={[styles.heroText, { opacity: fadeAnim }]}>
                  <Text style={styles.heroTitle}>
                    Добро пожаловать в{'\n'}
                    <Text style={styles.brandText}>BabyJoy</Text>
                  </Text>
                  <Text style={styles.heroSubtitle}>
                    Твой персональный спутник на пути к материнству. Мы поддержим тебя каждый день этого удивительного путешествия.
                  </Text>
                </Animated.View>

                <View style={styles.bottomSection}>
                  <View style={styles.featuresRow}>
                    <View style={styles.featureCard}>
                      <FontAwesome5 name="baby" size={24} color="#ec4899" solid style={styles.featureIcon} />
                      <Text style={styles.featureLabel}>Развитие малыша</Text>
                    </View>
                    <View style={styles.featureCard}>
                      <FontAwesome5 name="heart" size={24} color="#059669" solid style={styles.featureIcon} />
                      <Text style={styles.featureLabel}>Здоровье мамы</Text>
                    </View>
                    <View style={styles.featureCard}>
                      <FontAwesome5 name="robot" size={24} color="#8b5cf6" solid style={styles.featureIcon} />
                      <Text style={styles.featureLabel}>AI помощник</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startButton} onPress={nextScreen}>
                    <LinearGradient
                      colors={['#ec4899', '#8b5cf6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startButtonGradient}
                    >
                      <Text style={styles.startButtonText}>Начать путешествие</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        );

      case 2:
        return (
          <LinearGradient
            colors={['#f0fdfa', '#f0f9ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
          >
            <View style={styles.onboardingContent}>
              <View style={styles.floatingHeader}>
                <View style={styles.headerLogo}>
                  <FontAwesome5 name="heart" size={14} color="#ec4899" solid />
                </View>
                <TouchableOpacity onPress={skipOnboarding}>
                  <Text style={styles.skipText}>Пропустить</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      { 
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%']
                        })
                      }
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStep}>Шаг {currentScreen} из 4</Text>
                  <Text style={styles.progressTitle}>{getStepTitle()}</Text>
                </View>
              </View>

              <View style={styles.screenContentContainer}>
                <Animated.View style={[styles.heroImageContainer, { transform: [{ scale: bounceAnim }] }]}>
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/10dafd2227-0d77a0f92f8a07c0412d.png' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Animated.View style={[styles.heroText, { opacity: fadeAnim }]}>
                  <Text style={styles.heroTitle}>
                    Умный <Text style={styles.emeraldText}>AI помощник</Text>
                  </Text>
                  <Text style={styles.heroSubtitle}>
                    Получай персональные советы, отвечай на вопросы и получай поддержку 24/7 от нашего умного помощника.
                  </Text>
                </Animated.View>

                <View style={styles.bottomSection}>
                  <View style={styles.aiFeaturesList}>
                    <View style={styles.aiFeatureItem}>
                      <View style={styles.aiFeatureHeader}>
                        <FontAwesome5 name="question-circle" size={16} color="#059669" solid />
                        <Text style={styles.aiFeatureTitle}>Можно ли мне...?</Text>
                      </View>
                      <Text style={styles.aiFeatureDescription}>Быстрые ответы на ежедневные вопросы</Text>
                    </View>

                    <View style={styles.aiFeatureItem}>
                      <View style={styles.aiFeatureHeader}>
                        <FontAwesome5 name="lightbulb" size={16} color="#2563eb" solid />
                        <Text style={styles.aiFeatureTitle}>Что делать если...?</Text>
                      </View>
                      <Text style={styles.aiFeatureDescription}>Советы для любой ситуации</Text>
                    </View>

                    <View style={styles.aiFeatureItem}>
                      <View style={styles.aiFeatureHeader}>
                        <FontAwesome5 name="microphone" size={16} color="#8b5cf6" solid />
                        <Text style={styles.aiFeatureTitle}>Голосовые сообщения</Text>
                      </View>
                      <Text style={styles.aiFeatureDescription}>Говори как с лучшей подругой</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startButton} onPress={nextScreen}>
                    <LinearGradient
                      colors={['#059669', '#2563eb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startButtonGradient}
                    >
                      <Text style={styles.startButtonText}>Звучит отлично!</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        );

      case 3:
        return (
          <LinearGradient
            colors={['#fdf2f8', '#fef7f0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
          >
            <View style={styles.onboardingContent}>
              <View style={styles.floatingHeader}>
                <View style={styles.headerLogo}>
                  <FontAwesome5 name="heart" size={14} color="#ec4899" solid />
                </View>
                <TouchableOpacity onPress={skipOnboarding}>
                  <Text style={styles.skipText}>Пропустить</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      { 
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%']
                        })
                      }
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStep}>Шаг {currentScreen} из 4</Text>
                  <Text style={styles.progressTitle}>{getStepTitle()}</Text>
                </View>
              </View>

              <View style={styles.screenContentContainer}>
                <Animated.View style={[styles.heroImageContainer, { transform: [{ scale: bounceAnim }] }]}>
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d67032ddd3-1c2867ad7da78e6fd8e3.png' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Animated.View style={[styles.heroText, { opacity: fadeAnim }]}>
                  <Text style={styles.heroTitle}>
                    Отслеживай <Text style={styles.pinkText}>развитие</Text>
                  </Text>
                  <Text style={styles.heroSubtitle}>
                    Следи за ростом малыша, записывай симптомы и веди дневник самых важных моментов беременности.
                  </Text>
                </Animated.View>

                <View style={styles.bottomSection}>
                  <View style={styles.trackingGrid}>
                    <View style={styles.trackingCard}>
                      <View style={styles.trackingIconContainer}>
                        <FontAwesome5 name="calendar-check" size={16} color="#ec4899" solid />
                      </View>
                      <Text style={styles.trackingTitle}>Календарь</Text>
                      <Text style={styles.trackingDescription}>40 недель развития</Text>
                    </View>

                    <View style={styles.trackingCard}>
                      <View style={styles.trackingIconContainer}>
                        <FontAwesome5 name="heartbeat" size={16} color="#ea580c" solid />
                      </View>
                      <Text style={styles.trackingTitle}>Симптомы</Text>
                      <Text style={styles.trackingDescription}>Ежедневный трекер</Text>
                    </View>

                    <View style={styles.trackingCard}>
                      <View style={styles.trackingIconContainer}>
                        <FontAwesome5 name="book" size={16} color="#059669" solid />
                      </View>
                      <Text style={styles.trackingTitle}>Дневник</Text>
                      <Text style={styles.trackingDescription}>Твоя история</Text>
                    </View>

                    <View style={styles.trackingCard}>
                      <View style={styles.trackingIconContainer}>
                        <FontAwesome5 name="chart-line" size={16} color="#2563eb" solid />
                      </View>
                      <Text style={styles.trackingTitle}>Графики</Text>
                      <Text style={styles.trackingDescription}>Визуальный прогресс</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startButton} onPress={nextScreen}>
                    <LinearGradient
                      colors={['#ec4899', '#ea580c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startButtonGradient}
                    >
                      <Text style={styles.startButtonText}>Готова отслеживать</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        );

      case 4:
        return (
          <LinearGradient
            colors={['#f0f9ff', '#f0fdfa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
          >
            <View style={styles.onboardingContent}>
              <View style={styles.floatingHeader}>
                <View style={styles.headerLogo}>
                  <FontAwesome5 name="heart" size={14} color="#ec4899" solid />
                </View>
                <TouchableOpacity onPress={skipOnboarding}>
                  <Text style={styles.skipText}>Пропустить</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      { 
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%']
                        })
                      }
                    ]}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStep}>Шаг {currentScreen} из 4</Text>
                  <Text style={styles.progressTitle}>{getStepTitle()}</Text>
                </View>
              </View>

              <View style={styles.screenContentContainer}>
                <Animated.View style={[styles.heroImageContainer, { transform: [{ scale: bounceAnim }] }]}>
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6a15c26b7b-57c194c53675f07ef759.png' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Animated.View style={[styles.heroText, { opacity: fadeAnim }]}>
                  <Text style={styles.heroTitle}>
                    Найди свою <Text style={styles.blueText}>поддержку</Text>
                  </Text>
                  <Text style={styles.heroSubtitle}>
                    Присоединяйся к сообществу будущих мам, делись опытом и получай поддержку от тех, кто понимает.
                  </Text>
                </Animated.View>

                <View style={styles.bottomSection}>
                  <View style={styles.communityFeatures}>
                    <View style={styles.communityFeatureCard}>
                      <View style={styles.communityIconContainer}>
                        <FontAwesome5 name="users" size={16} color="#2563eb" solid />
                      </View>
                      <View style={styles.communityFeatureText}>
                        <Text style={styles.communityFeatureTitle}>Группы по неделям</Text>
                        <Text style={styles.communityFeatureSubtitle}>Общайся с мамами на том же сроке</Text>
                      </View>
                    </View>

                    <View style={styles.communityFeatureCard}>
                      <View style={styles.communityIconContainer}>
                        <FontAwesome5 name="comments" size={16} color="#059669" solid />
                      </View>
                      <View style={styles.communityFeatureText}>
                        <Text style={styles.communityFeatureTitle}>Чаты по интересам</Text>
                        <Text style={styles.communityFeatureSubtitle}>Питание, спорт, подготовка к родам</Text>
                      </View>
                    </View>

                    <View style={styles.communityFeatureCard}>
                      <View style={styles.communityIconContainer}>
                        <FontAwesome5 name="heart" size={16} color="#8b5cf6" solid />
                      </View>
                      <View style={styles.communityFeatureText}>
                        <Text style={styles.communityFeatureTitle}>Поддержка 24/7</Text>
                        <Text style={styles.communityFeatureSubtitle}>Кто-то всегда онлайн и готов помочь</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startButton} onPress={nextScreen}>
                    <LinearGradient
                      colors={['#2563eb', '#8b5cf6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startButtonGradient}
                    >
                      <Text style={styles.startButtonText}>Начать использовать BabyJoy</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        );

      default:
        return null;
    }
  };

  return renderOnboardingScreen();
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  onboardingContent: {
    flex: 1,
    position: 'relative',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Полупрозрачная подложка
  },
  headerLogo: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937', // Темный текст вместо белого
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressContainer: {
    position: 'absolute',
    top: 116, // Ниже хедера с подложкой
    left: 0,
    right: 0,
    zIndex: 40,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Полупрозрачная подложка
    paddingVertical: 12,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressStep: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  progressTitle: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  screenContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 180, // Больше отступ для хедера и прогресса
  },
  heroImageContainer: {
    marginBottom: 32,
    shadowColor: '#fbcfe8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 8,
  },
  heroImage: {
    width: 320,
    height: 320,
    borderRadius: 24,
  },
  heroText: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  brandText: {
    color: '#ec4899',
  },
  emeraldText: {
    color: '#059669',
  },
  pinkText: {
    color: '#ec4899',
  },
  blueText: {
    color: '#2563eb',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  bottomSection: {
    width: '100%',
    gap: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  aiFeaturesList: {
    gap: 12,
  },
  aiFeatureItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
  },
  aiFeatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiFeatureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12,
  },
  aiFeatureDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  trackingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  trackingCard: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  trackingIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#fce7f3',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  trackingDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  communityFeatures: {
    gap: 12,
  },
  communityFeatureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  communityFeatureText: {
    flex: 1,
  },
  communityFeatureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  communityFeatureSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  startButton: {
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Registration styles
  registrationContainer: {
    flex: 1,
  },
  registrationContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  registrationHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  registrationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registrationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  registrationSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  weekInputsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  weekInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
    textAlign: 'center',
  },
  pregnancyOptionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  pregnancyOption: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  selectedPregnancyOption: {
    borderColor: '#ec4899',
    backgroundColor: '#fef2f2',
  },
  pregnancyOptionIcon: {
    marginBottom: 8,
  },
  pregnancyOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestOption: {
    width: '47%',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  selectedInterestOption: {
    borderColor: '#059669',
    backgroundColor: '#f0fdf4',
  },
  interestIcon: {
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  registrationFooter: {
    paddingTop: 32,
    gap: 16,
  },
  completeButton: {
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#ec4899',
    textDecorationLine: 'underline',
  },
  // Subscription styles
  subscriptionContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subscriptionHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  subscriptionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  subscriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subscriptionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  plansContainer: {
    flex: 1,
    gap: 16,
  },
  freePlan: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  premiumPlan: {
    borderRadius: 24,
    padding: 24,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  premiumPlanName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  premiumPrice: {
    alignItems: 'flex-end',
  },
  premiumPriceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  premiumPricePeriod: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  planFeatures: {
    gap: 8,
    marginBottom: 24,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planFeatureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  freePlanButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  freePlanButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  premiumPlanButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  premiumPlanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  subscriptionDisclaimer: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  // Permissions styles
  permissionsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  permissionsHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  permissionsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  permissionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  permissionsSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  permissionsContent: {
    flex: 1,
  },
  permissionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#2563eb',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  permissionsFooter: {
    paddingVertical: 16,
    gap: 16,
  },
  continueButton: {
    width: '100%',
    borderRadius: 16,
  },
  continueButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipPermissionsText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Tutorial styles
  tutorialContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tutorialHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  tutorialIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tutorialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  tutorialSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  tutorialContent: {
    flex: 1,
  },
  tutorialCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  tutorialCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tutorialCardIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fce7f3',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tutorialCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  tutorialCardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  tutorialExample: {
    backgroundColor: '#fce7f3',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tutorialExampleIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#fbb6ce',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorialExampleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  tutorialExampleQuestion: {
    fontSize: 14,
    color: '#6b7280',
  },
  tutorialExampleBot: {
    width: 48,
    height: 48,
    backgroundColor: '#8b5cf6',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmojis: {
    flexDirection: 'row',
    gap: 8,
  },
  moodEmoji: {
    fontSize: 18,
  },
  finishButton: {
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
  },
  finishButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingImageContainer: {
    marginBottom: 32,
  },
  loadingImage: {
    width: 240,
    height: 240,
    borderRadius: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  loadingBars: {
    width: '100%',
    gap: 16,
  },
  loadingBarItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
  },
  loadingBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadingBarTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  loadingBarPercent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
  },
  loadingBarTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});