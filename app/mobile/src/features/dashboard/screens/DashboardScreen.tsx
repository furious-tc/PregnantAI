import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Pressable,
  Image,
  Animated
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FloatingAIButton } from '../../../shared/ui/FloatingAIButton';
import { AIChatModal } from '../../../shared/ui/AIChatModal';

export const DashboardScreen: React.FC = () => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showAITooltip, setShowAITooltip] = useState(false);
  
  // Animation for baby image
  const floatAnim = useRef(new Animated.Value(0)).current;
  // Animation for AI button
  const aiButtonFloatAnim = useRef(new Animated.Value(0)).current;
  const aiButtonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating animation for baby image
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

    // Floating animation for AI button
    Animated.loop(
      Animated.sequence([
        Animated.timing(aiButtonFloatAnim, {
          toValue: -5,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(aiButtonFloatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [floatAnim, aiButtonFloatAnim]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAIButtonPress = () => {
    // Scale animation on press like in original
    Animated.sequence([
      Animated.timing(aiButtonScaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(aiButtonScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();

    setShowAIChat(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef7f0', '#fdf2f8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      >
        <View style={styles.mobileContainer}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <LinearGradient
                    colors={['#fbcfe8', '#fed7aa']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.logo}
                  >
                    <FontAwesome5 name="heart" size={14} color="#ec4899" solid />
                  </LinearGradient>
                  <View>
                    <Text style={styles.appName}>BabyJoy</Text>
                    <Text style={styles.tagline}>Твой спутник</Text>
                  </View>
                </View>
                <View style={styles.headerRight}>
                  <TouchableOpacity style={styles.notificationButton}>
                    <FontAwesome5 name="bell" size={14} color="#059669" solid />
                  </TouchableOpacity>
                  <Image 
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }}
                    style={styles.avatar}
                  />
                </View>
              </View>

              {/* Pregnancy Week Section */}
              <LinearGradient
                colors={['#fef7f0', '#fdf2f8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.pregnancyWeekSection}
              >
                <View style={styles.weekContent}>
                  <View style={styles.weekHeader}>
                    <Text style={styles.weekTitle}>Ты на 23-й неделе</Text>
                    <Text style={styles.weekSubtitle}>Второй триместр • 161 день</Text>
                  </View>
                  
                  <View style={styles.babyImageContainer}>
                    <Animated.View 
                      style={[
                        styles.babyImageWrapper,
                        { transform: [{ translateY: floatAnim }] }
                      ]}
                    >
                      <Image 
                        source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/322cac6359-da852632489d4b7c694c.png' }}
                        style={styles.babyImage}
                        resizeMode="cover"
                      />
                    </Animated.View>
                    <View style={styles.weekBadge}>
                      <Text style={styles.weekBadgeText}>23 недели</Text>
                    </View>
                  </View>

                  <View style={styles.babySizeCard}>
                    <View style={styles.babySizeHeader}>
                      <Text style={styles.babySizeTitle}>Размер малыша</Text>
                        <FontAwesome5 name="ruler-combined" size={14} color="#fbcfe8" solid />
                    </View>
                    <View style={styles.babySizeStats}>
                      <View style={styles.babySizeStat}>
                        <Text style={styles.lengthValue}>28 см</Text>
                        <Text style={styles.statLabel}>длина</Text>
                      </View>
                      <View style={styles.babySizeStat}>
                        <Text style={styles.weightValue}>500 г</Text>
                        <Text style={styles.statLabel}>вес</Text>
                      </View>
                    </View>
                  </View>

                  <LinearGradient
                    colors={['#a7f3d0', '#bae6fd']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.fruitComparisonCard}
                  >
                    <View style={styles.fruitIcon}>
                      <FontAwesome5 name="seedling" size={16} color="#059669" solid />
                    </View>
                    <View style={styles.fruitText}>
                      <Text style={styles.fruitTitle}>Как папайя</Text>
                      <Text style={styles.fruitSubtitle}>Малыш активно развивается</Text>
                    </View>
                  </LinearGradient>
                </View>
              </LinearGradient>

              {/* Daily Tips Section */}
              <View style={styles.dailyTipsSection}>
                <View style={styles.tipsHeader}>
                  <Text style={styles.tipsTitle}>Советы дня</Text>
                  <TouchableOpacity>
                    <Text style={styles.allTipsLink}>Все советы</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.tipsContainer}>
                  {/* Nutrition Tip */}
                  <LinearGradient
                    colors={['#fdf2f8', '#ffffff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.tipCard, { borderColor: '#fce7f3' }]}
                  >
                    <View style={styles.tipIconContainer}>
                      <View style={styles.nutritionTipIcon}>
                        <FontAwesome5 name="apple-alt" size={12} color="#ec4899" solid />
                      </View>
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>Питание</Text>
                      <Text style={styles.tipText}>Добавь в рацион продукты с железом: говядину, шпинат, чечевицу. Это поможет избежать анемии.</Text>
                    </View>
                  </LinearGradient>

                  {/* Exercise Tip */}
                  <LinearGradient
                    colors={['#f0fdfa', '#ffffff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.tipCard, { borderColor: '#a7f3d0' }]}
                  >
                    <View style={styles.tipIconContainer}>
                      <View style={styles.exerciseTipIcon}>
                        <FontAwesome5 name="dumbbell" size={12} color="#059669" solid />
                      </View>
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>Упражнения</Text>
                      <Text style={styles.tipText}>Попробуй пренатальную йогу. 15 минут в день помогут укрепить спину и подготовиться к родам.</Text>
                    </View>
                  </LinearGradient>

                  {/* Sleep Tip */}
                  <LinearGradient
                    colors={['#f0f9ff', '#ffffff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.tipCard, { borderColor: '#dbeafe' }]}
                  >
                    <View style={styles.tipIconContainer}>
                      <View style={styles.sleepTipIcon}>
                        <FontAwesome5 name="moon" size={12} color="#2563eb" solid />
                      </View>
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>Сон</Text>
                      <Text style={styles.tipText}>Спи на левом боку с подушкой между ног. Это улучшит кровообращение к малышу.</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>

              {/* Mood Tracker Section */}
              <LinearGradient
                colors={['#fef7f0', '#fdf2f8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.moodTrackerSection}
              >
                <Text style={styles.moodTitle}>Как настроение?</Text>
                <View style={styles.moodCard}>
                  <View style={styles.moodOptions}>
                    {[
                      { emoji: '😊', label: 'Отлично', id: 'excellent' },
                      { emoji: '😌', label: 'Хорошо', id: 'good' },
                      { emoji: '😐', label: 'Нормально', id: 'normal' },
                      { emoji: '😔', label: 'Грустно', id: 'sad' },
                    ].map(mood => (
                      <TouchableOpacity
                        key={mood.id}
                        style={[
                          styles.moodOption,
                          selectedMood === mood.id && styles.selectedMoodOption
                        ]}
                        onPress={() => setSelectedMood(mood.id)}
                      >
                        <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                        <Text style={styles.moodLabel}>{mood.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </LinearGradient>

              {/* Symptoms Tracker Section */}
              <View style={styles.symptomsSection}>
                <Text style={styles.symptomsTitle}>Отметь симптомы</Text>
                <View style={styles.symptomsGrid}>
                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      styles.fatigueSymptom,
                      selectedSymptoms.includes('Усталость') && styles.selectedSymptom
                    ]}
                    onPress={() => toggleSymptom('Усталость')}
                  >
                    <FontAwesome5 name="bed" size={12} color="#ec4899" solid style={styles.symptomIconFA} />
                    <Text style={styles.symptomText}>Усталость</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      styles.nauseaSymptom,
                      selectedSymptoms.includes('Тошнота') && styles.selectedSymptom
                    ]}
                    onPress={() => toggleSymptom('Тошнота')}
                  >
                    <FontAwesome5 name="dizzy" size={12} color="#059669" solid style={styles.symptomIconFA} />
                    <Text style={styles.symptomText}>Тошнота</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      styles.headacheSymptom,
                      selectedSymptoms.includes('Головная боль') && styles.selectedSymptom
                    ]}
                    onPress={() => toggleSymptom('Головная боль')}
                  >
                    <FontAwesome5 name="head-side-cough" size={12} color="#2563eb" solid style={styles.symptomIconFA} />
                    <Text style={styles.symptomText}>Головная боль</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      styles.heartburnSymptom,
                      selectedSymptoms.includes('Изжога') && styles.selectedSymptom
                    ]}
                    onPress={() => toggleSymptom('Изжога')}
                  >
                    <FontAwesome5 name="heartbeat" size={12} color="#ea580c" solid style={styles.symptomIconFA} />
                    <Text style={styles.symptomText}>Изжога</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Checklist Section */}
              <View style={styles.checklistSection}>
                <View style={styles.checklistHeader}>
                  <Text style={styles.checklistTitle}>Чек-лист на сегодня</Text>
                  <Text style={styles.checklistProgress}>3/5 выполнено</Text>
                </View>
                
                <View style={styles.checklistItems}>
                  {/* Completed Items */}
                  {[
                    { text: 'Принять витамины', time: '9:00 AM', completed: true },
                    { text: 'Выпить 2 стакана воды', time: '11:30 AM', completed: true },
                    { text: 'Прогулка 30 минут', time: '2:15 PM', completed: true },
                  ].map((item, index) => (
                    <View key={index} style={styles.checklistItemCompleted}>
                      <View style={styles.checkIcon}>
                        <FontAwesome5 name="check" size={12} color="#ffffff" solid />
                      </View>
                      <View style={styles.checklistItemContent}>
                        <Text style={[styles.checklistItemText, styles.completedText]}>{item.text}</Text>
                        <Text style={styles.checklistItemTime}>{item.time}</Text>
                      </View>
                    </View>
                  ))}

                  {/* Pending Items */}
                  {[
                    { text: 'Упражнения для беременных', time: 'Запланировано на 6:00 PM' },
                    { text: 'Медитация перед сном', time: 'Запланировано на 10:00 PM' },
                  ].map((item, index) => (
                    <View key={index} style={styles.checklistItemPending}>
                      <View style={styles.pendingIcon}>
                        <View style={styles.pendingDot} />
                      </View>
                      <View style={styles.checklistItemContent}>
                        <Text style={styles.checklistItemText}>{item.text}</Text>
                        <Text style={styles.checklistItemTime}>{item.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <LinearGradient
                  colors={['#fbcfe8', '#a7f3d0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressCard}
                >
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Прогресс дня</Text>
                    <Text style={styles.progressPercent}>60%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <LinearGradient
                      colors={['#f472b6', '#34d399']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.progressFill}
                    />
                  </View>
                </LinearGradient>
              </View>

              {/* Baby Movements Section */}
              <LinearGradient
                colors={['#f0f9ff', '#f0fdfa']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.babyMovementsSection}
              >
                <Text style={styles.movementsTitle}>Движения малыша</Text>
                <View style={styles.movementsCard}>
                  <View style={styles.movementsHeader}>
                    <View style={styles.movementsInfo}>
                      <LinearGradient
                        colors={['#60a5fa', '#34d399']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.babyIcon}
                      >
                        <FontAwesome5 name="baby" size={16} color="#ffffff" solid />
                      </LinearGradient>
                      <View>
                        <Text style={styles.movementsToday}>Сегодня</Text>
                        <Text style={styles.movementsLast}>Последнее: 2 часа назад</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.markButton}>
                      <Text style={styles.markButtonText}>Отметить</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.movementsStats}>
                    <View style={styles.todayMovement}>
                      <Text style={styles.todayNumber}>8</Text>
                      <Text style={styles.movementLabel}>Сегодня</Text>
                    </View>
                    <View style={styles.yesterdayMovement}>
                      <Text style={styles.yesterdayNumber}>12</Text>
                      <Text style={styles.movementLabel}>Вчера</Text>
                    </View>
                    <View style={styles.averageMovement}>
                      <Text style={styles.averageNumber}>10</Text>
                      <Text style={styles.movementLabel}>Среднее</Text>
                    </View>
                    <View style={styles.recordMovement}>
                      <Text style={styles.recordNumber}>15</Text>
                      <Text style={styles.movementLabel}>Рекорд</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              {/* Health Metrics Section */}
              <View style={styles.healthMetricsSection}>
                <Text style={styles.healthTitle}>Здоровье мамы</Text>
                
                {/* Weight Card */}
                <LinearGradient
                  colors={['#fef2f2', '#fce7f3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.healthCard, { borderColor: '#fce7f3' }]}
                >
                  <View style={styles.metricHeader}>
                    <View style={styles.metricInfo}>
                      <FontAwesome5 name="weight" size={14} color="#ec4899" solid />
                      <Text style={styles.metricName}>Вес</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.updateButton}>Обновить</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.metricValue}>
                    <Text style={styles.metricNumber}>68.5</Text>
                    <Text style={styles.metricUnit}>кг</Text>
                    <View style={styles.changeIndicator}>
                      <Text style={styles.changeText}>+0.5 кг</Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Blood Pressure Card */}
                <LinearGradient
                  colors={['#eff6ff', '#e0f2fe']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.healthCard, { borderColor: '#dbeafe' }]}
                >
                  <View style={styles.metricHeader}>
                    <View style={styles.metricInfo}>
                      <FontAwesome5 name="heartbeat" size={14} color="#2563eb" solid />
                      <Text style={styles.metricName}>Давление</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.measureButton}>Измерить</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.metricValue}>
                    <Text style={styles.metricNumber}>120/80</Text>
                    <Text style={styles.metricUnit}>мм рт.ст.</Text>
                    <View style={styles.normalIndicator}>
                      <Text style={styles.normalText}>Норма</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Appointments Section */}
              <View style={styles.appointmentsSection}>
                <Text style={styles.appointmentsTitle}>Ближайшие визиты</Text>
                
                {/* Doctor Appointment */}
                <View style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.appointmentInfo}>
                      <View style={styles.doctorIcon}>
                        <FontAwesome5 name="user-md" size={14} color="#ea580c" solid />
                      </View>
                      <View>
                        <Text style={styles.appointmentType}>Гинеколог</Text>
                        <Text style={styles.appointmentDescription}>Плановый осмотр</Text>
                      </View>
                    </View>
                    <View style={styles.appointmentDateTime}>
                      <Text style={styles.appointmentDate}>15 мая</Text>
                      <Text style={styles.appointmentTime}>14:30</Text>
                    </View>
                  </View>
                  <View style={styles.appointmentLocation}>
                    <FontAwesome5 name="map-marker-alt" size={10} color="#9ca3af" solid />
                    <Text style={styles.locationText}>Клиника "Здоровье", каб. 205</Text>
                  </View>
                </View>

                {/* Ultrasound Appointment */}
                <View style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.appointmentInfo}>
                      <View style={styles.ultrasoundIcon}>
                        <FontAwesome5 name="microscope" size={14} color="#2563eb" solid />
                      </View>
                      <View>
                        <Text style={styles.appointmentType}>УЗИ</Text>
                        <Text style={styles.appointmentDescription}>Второй скрининг</Text>
                      </View>
                    </View>
                    <View style={styles.appointmentDateTime}>
                      <Text style={styles.appointmentDate}>22 мая</Text>
                      <Text style={styles.appointmentTime}>10:00</Text>
                    </View>
                  </View>
                  <View style={styles.appointmentLocation}>
                    <FontAwesome5 name="map-marker-alt" size={10} color="#9ca3af" solid />
                    <Text style={styles.locationText}>Диагностический центр</Text>
                  </View>
                </View>

                <LinearGradient
                  colors={['#fed7aa', '#fbcfe8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addVisitButton}
                >
                  <TouchableOpacity style={styles.addVisitButtonContent}>
                    <Text style={styles.addVisitButtonText}>Добавить визит</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/* Community Section */}
              <View style={styles.communitySection}>
                <View style={styles.communityHeader}>
                  <Text style={styles.communityTitle}>Сообщество мам</Text>
                  <TouchableOpacity>
                    <Text style={styles.allGroupsLink}>Все группы</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Moms 2024 Group */}
                <LinearGradient
                  colors={['#fdf2f8', '#ffffff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.communityCard}
                >
                  <View style={styles.communityCardHeader}>
                    <View style={styles.groupInfo}>
                      <View style={styles.groupIcon}>
                        <FontAwesome5 name="users" size={12} color="#ec4899" solid />
                      </View>
                      <View>
                        <Text style={styles.groupName}>Мамы 2024</Text>
                        <Text style={styles.groupMembers}>234 участницы</Text>
                      </View>
                    </View>
                    <View style={styles.onlineIndicator} />
                  </View>
                  <Text style={styles.lastMessage}>"Кто-нибудь чувствует сильные толчки на 23 неделе?"</Text>
                  <View style={styles.messageStats}>
                    <Text style={styles.messageCount}>12 новых сообщений</Text>
                    <Text style={styles.messageTime}>2 мин назад</Text>
                  </View>
                </LinearGradient>

                {/* Healthy Nutrition Group */}
                <LinearGradient
                  colors={['#f0fdfa', '#ffffff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.communityCard}
                >
                  <View style={styles.communityCardHeader}>
                    <View style={styles.groupInfo}>
                      <View style={styles.leafIcon}>
                        <FontAwesome5 name="leaf" size={12} color="#059669" solid />
                      </View>
                      <View>
                        <Text style={styles.groupName}>Здоровое питание</Text>
                        <Text style={styles.groupMembers}>89 участниц</Text>
                      </View>
                    </View>
                    <View style={[styles.onlineIndicator, { backgroundColor: '#f59e0b' }]} />
                  </View>
                  <Text style={styles.lastMessage}>"Поделилась рецептом смузи с железом"</Text>
                  <View style={styles.messageStats}>
                    <Text style={styles.messageCount}>5 новых сообщений</Text>
                    <Text style={styles.messageTime}>1 час назад</Text>
                  </View>
                </LinearGradient>
              </View>

              {/* Bottom padding for tab bar */}
              <View style={styles.bottomPadding} />
            </ScrollView>
          </SafeAreaView>

          {/* Floating AI Button */}
          <Animated.View 
            style={[
              styles.floatingAIContainer,
              {
                transform: [
                  { translateY: aiButtonFloatAnim },
                  { scale: aiButtonScaleAnim }
                ]
              }
            ]}
          >
            <Pressable 
              style={styles.floatingAIButton}
              onPress={handleAIButtonPress}
              onHoverIn={() => setShowAITooltip(true)}
              onHoverOut={() => setShowAITooltip(false)}
              onPressIn={() => setShowAITooltip(true)}
              onPressOut={() => setShowAITooltip(false)}
            >
              <LinearGradient
                colors={['#ec4899', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.aiButtonGradient}
              >
                <FontAwesome5 name="robot" size={18} color="#ffffff" solid />
              </LinearGradient>
            </Pressable>
            {showAITooltip && (
              <View style={styles.aiTooltip}>
                <Text style={styles.aiTooltipText}>AI помощник</Text>
              </View>
            )}
          </Animated.View>

          {/* AI Chat Modal */}
          <AIChatModal 
            visible={showAIChat} 
            onClose={() => setShowAIChat(false)} 
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  mobileContainer: {
    flex: 1,
    maxWidth: 428,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#fce7f3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  tagline: {
    fontSize: 12,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0fdfa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fbcfe8',
  },
  pregnancyWeekSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  weekContent: {
    alignItems: 'center',
  },
  weekHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  weekTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  weekSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  babyImageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  babyImageWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#fbcfe8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 8,
  },
  babyImage: {
    width: 192,
    height: 192,
  },
  weekBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fbcfe8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  weekBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#be185d',
  },
  babySizeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  babySizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  babySizeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  babySizeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  babySizeStat: {
    alignItems: 'center',
  },
  lengthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  weightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  fruitComparisonCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  fruitIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fruitText: {
    flex: 1,
  },
  fruitTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  fruitSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  dailyTipsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  allTipsLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ec4899',
  },
  tipsContainer: {
    gap: 16,
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  tipIconContainer: {
    marginRight: 12,
  },
  nutritionTipIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fbcfe8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTipIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#a7f3d0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepTipIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#bae6fd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  moodTrackerSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  moodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  selectedMoodOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  symptomsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  symptomsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomButton: {
    width: '47%',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  fatigueSymptom: {
    backgroundColor: '#fdf2f8',
    borderColor: '#fce7f3',
  },
  nauseaSymptom: {
    backgroundColor: '#f0fdfa',
    borderColor: '#a7f3d0',
  },
  headacheSymptom: {
    backgroundColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  heartburnSymptom: {
    backgroundColor: '#fef7f0',
    borderColor: '#fed7aa',
  },
  selectedSymptom: {
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  },
  symptomIcon: {
    marginRight: 12,
    fontSize: 14,
  },
  symptomIconFA: {
    marginRight: 12,
  },
  checkIconEmoji: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  babyIconEmoji: {
    fontSize: 20,
    color: '#ffffff',
  },
  robotIconEmoji: {
    fontSize: 20,
    color: '#ffffff',
  },
  iconText: {
    fontSize: 14,
  },
  symptomText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  checklistSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  checklistProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  checklistItems: {
    gap: 12,
  },
  checklistItemCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  checklistItemPending: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  checkIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkIconText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  pendingIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pendingDot: {
    width: 12,
    height: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  checklistItemContent: {
    flex: 1,
  },
  checklistItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  checklistItemTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  progressCard: {
    marginTop: 16,
    borderRadius: 12,
    padding: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '60%',
    height: '100%',
    borderRadius: 4,
  },
  babyMovementsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  movementsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
  },
  movementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  movementsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  babyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  babyIconText: {
    fontSize: 20,
    color: '#ffffff',
  },
  movementsToday: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  movementsLast: {
    fontSize: 12,
    color: '#6b7280',
  },
  markButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  markButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  movementsStats: {
    flexDirection: 'row',
    gap: 8,
  },
  todayMovement: {
    flex: 1,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  yesterdayMovement: {
    flex: 1,
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  averageMovement: {
    flex: 1,
    backgroundColor: '#fce7f3',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  recordMovement: {
    flex: 1,
    backgroundColor: '#fed7aa',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  todayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  yesterdayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  averageNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  recordNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ea580c',
  },
  movementLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  healthMetricsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  healthCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12,
  },
  updateButton: {
    fontSize: 14,
    color: '#ec4899',
  },
  measureButton: {
    fontSize: 14,
    color: '#3b82f6',
  },
  metricValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 8,
  },
  metricUnit: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  changeIndicator: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeText: {
    fontSize: 12,
    color: '#059669',
  },
  normalIndicator: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  normalText: {
    fontSize: 12,
    color: '#059669',
  },
  appointmentsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fef7f0',
  },
  appointmentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fed7aa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ultrasoundIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#dbeafe',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  appointmentDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  appointmentDateTime: {
    alignItems: 'flex-end',
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  appointmentTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  appointmentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  addVisitButton: {
    borderRadius: 12,
    marginTop: 16,
  },
  addVisitButtonContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  addVisitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  communitySection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  allGroupsLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ec4899',
  },
  communityCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  communityCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fbb6ce',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  leafIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#86efac',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  groupMembers: {
    fontSize: 12,
    color: '#6b7280',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  messageStats: {
    flexDirection: 'row',
    gap: 16,
  },
  messageCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  floatingAIContainer: {
    position: 'absolute',
    bottom: 48, // ещё ниже кнопка
    right: 24,
    zIndex: 50,
  },
  floatingAIButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  aiButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTooltip: {
    position: 'absolute',
    top: -48,
    right: 0,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    opacity: 0.9,
  },
  aiTooltipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});