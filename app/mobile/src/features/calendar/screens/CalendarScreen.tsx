import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Switch, Animated, Easing, Image } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface WeekData {
  week: number;
  fruitName: string;
  length: string;
  weight: string;
  iconName: keyof typeof FontAwesome5.glyphMap;
  color: string;
}

const weekData: WeekData[] = [
  { week: 20, fruitName: 'Банан', length: '25 см', weight: '300 г', iconName: 'apple-alt', color: '#fed7aa' },
  { week: 21, fruitName: 'Морковь', length: '26 см', weight: '360 г', iconName: 'carrot', color: '#fed7aa' },
  { week: 22, fruitName: 'Кукуруза', length: '27 см', weight: '430 г', iconName: 'seedling', color: '#fef7f0' },
  { week: 23, fruitName: 'Папайя', length: '28 см', weight: '500 г', iconName: 'lemon', color: '#fdf2f8' },
  { week: 24, fruitName: 'Кукуруза', length: '30 см', weight: '600 г', iconName: 'corn', color: '#f0fdfa' },
  { week: 25, fruitName: 'Брюква', length: '34 см', weight: '660 г', iconName: 'leaf', color: '#f0f9ff' },
  { week: 26, fruitName: 'Салат', length: '35 см', weight: '760 г', iconName: 'leaf', color: '#ecfdf5' },
];

type TabType = 'development' | 'mom' | 'tips';

export const CalendarScreen: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(23);
  const [activeTab, setActiveTab] = useState<TabType>('development');
  const [checklistItems, setChecklistItems] = useState({
    ultrasound: false,
    courses: false,
    brace: false,
    wardrobe: false,
    diary: false,
  });

  // Animation for baby image
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for baby image
    const animate = () => {
      Animated.sequence([
        Animated.spring(floatAnim, {
          toValue: -6,
          useNativeDriver: true,
          tension: 10,
          friction: 8,
        }),
        Animated.spring(floatAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 10,
          friction: 8,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [floatAnim]);

  const getCurrentWeekData = () => {
    return weekData.find(w => w.week === currentWeek) || weekData[2];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    } else if (direction === 'next' && currentWeek < 42) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const toggleChecklistItem = (item: keyof typeof checklistItems) => {
    setChecklistItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const renderTabContent = () => {
    const weekInfo = getCurrentWeekData();
    
    switch (activeTab) {
      case 'development':
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.developmentCard}>
              <View style={styles.babyImageContainer}>
                <Animated.View 
                  style={[
                    styles.babyImage, 
                    { backgroundColor: weekInfo.color },
                    { transform: [{ translateY: floatAnim }] }
                  ]}
                >
                  <FontAwesome5 name={weekInfo.iconName} size={32} color="#1f2937" />
                </Animated.View>
                <View style={styles.weekBadge}>
                  <Text style={styles.weekBadgeText}>{currentWeek} неделя</Text>
                </View>
              </View>
              
              <Text style={styles.developmentTitle}>Развитие на {currentWeek} неделе</Text>
              <Text style={styles.developmentSubtitle}>Малыш активно растет и развивается</Text>
              
              <View style={styles.statsCard}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{weekInfo.length}</Text>
                  <Text style={styles.statLabel}>длина</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{weekInfo.weight}</Text>
                  <Text style={styles.statLabel}>вес</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>Как {weekInfo.fruitName.toLowerCase()}</Text>
                  <Text style={styles.statLabel}>размер</Text>
                </View>
              </View>
            </View>

            <View style={styles.developmentDetails}>
              <View style={[styles.detailCard, styles.pinkGradientCard]}>
                <View style={styles.detailIcon}>
                  <FontAwesome5 name="brain" size={28} color="#ec4899" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Мозг и нервная система</Text>
                  <Text style={styles.detailText}>Быстрое развитие мозга. Формируются извилины и борозды. Малыш начинает различать звуки и реагировать на свет.</Text>
                  <View style={styles.detailFeatures}>
                    <View style={styles.featureItem}>
                      <View style={styles.featureDot} />
                      <Text style={styles.featureText}>Слух развивается</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <View style={styles.featureDot} />
                      <Text style={styles.featureText}>Реакция на свет</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.detailCard, styles.mintGradientCard]}>
                <View style={[styles.detailIcon, { backgroundColor: '#ecfdf5' }]}>
                  <FontAwesome5 name="lungs" size={28} color="#10b981" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Дыхательная система</Text>
                  <Text style={styles.detailText}>Легкие продолжают созревать. Формируются альвеолы. Малыш делает дыхательные движения, тренируя диафрагму.</Text>
                  <View style={styles.importantNote}>
                    <Text style={styles.noteTitle}>Важно знать:</Text>
                    <Text style={styles.noteText}>Дыхательные движения помогают развитию легких</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.detailCard, styles.blueGradientCard]}>
                <View style={[styles.detailIcon, { backgroundColor: '#eff6ff' }]}>
                  <FontAwesome5 name="hand-rock" size={24} color="#3b82f6" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Движения и рефлексы</Text>
                  <Text style={styles.detailText}>Хватательный рефлекс укрепляется. Малыш может сжимать кулачки, касаться лица, играть с пуповиной.</Text>
                  <View style={styles.movementTypes}>
                    <View style={styles.movementItem}>
                      <Text style={styles.movementEmoji}>👐</Text>
                      <Text style={styles.movementText}>Хватает</Text>
                    </View>
                    <View style={styles.movementItem}>
                      <Text style={styles.movementEmoji}>🤱</Text>
                      <Text style={styles.movementText}>Сосет палец</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.detailCard, styles.orangeGradientCard]}>
                <View style={[styles.detailIcon, { backgroundColor: '#fff7ed' }]}>
                  <FontAwesome5 name="weight" size={24} color="#f59e0b" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Рост и вес</Text>
                  <Text style={styles.detailText}>Интенсивный рост. Формируется подкожная жировая ткань. Кожа становится менее прозрачной.</Text>
                  <View style={styles.growthStats}>
                    <View style={styles.growthItem}>
                      <Text style={styles.growthValue}>28</Text>
                      <Text style={styles.growthLabel}>см длина</Text>
                    </View>
                    <View style={styles.growthItem}>
                      <Text style={styles.growthValue}>500</Text>
                      <Text style={styles.growthLabel}>г вес</Text>
                    </View>
                    <View style={styles.growthItem}>
                      <Text style={styles.growthValue}>+15%</Text>
                      <Text style={styles.growthLabel}>рост/неделя</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Key Milestones */}
            <View style={styles.milestonesCard}>
              <View style={styles.milestonesHeader}>
                <FontAwesome5 name="star" size={18} color="#a855f7" solid />
                <Text style={styles.milestonesTitle}>Ключевые достижения недели</Text>
              </View>
              <View style={styles.milestonesList}>
                <View style={styles.milestoneItem}>
                  <View style={styles.milestoneCheck}>
                    <FontAwesome5 name="check" size={10} color="#a855f7" />
                  </View>
                  <Text style={styles.milestoneText}>Слух полностью сформирован</Text>
                </View>
                <View style={styles.milestoneItem}>
                  <View style={styles.milestoneCheck}>
                    <FontAwesome5 name="check" size={10} color="#a855f7" />
                  </View>
                  <Text style={styles.milestoneText}>Активные движения каждый день</Text>
                </View>
                <View style={styles.milestoneItem}>
                  <View style={styles.milestoneCheck}>
                    <FontAwesome5 name="check" size={10} color="#a855f7" />
                  </View>
                  <Text style={styles.milestoneText}>Формирование режима сна/бодрствования</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'mom':
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.momCard}>
              <View style={styles.momHeader}>
                <View style={styles.momImageContainer}>
                  <Image 
                    source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/574722a7ee-4c854c44329414afeccc.png' }}
                    style={styles.momImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.momTitle}>Изменения в организме мамы</Text>
                <Text style={styles.momSubtitle}>Что происходит на {currentWeek} неделе</Text>
              </View>
              
              <View style={styles.momDetails}>
                <View style={[styles.momDetailCard, styles.pinkGradientCard]}>
                  <View style={styles.momIcon}>
                    <FontAwesome5 name="baby" size={24} color="#ec4899" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Размер живота</Text>
                    <Text style={styles.momDetailText}>Матка поднимается выше пупка. Живот заметно округляется. Возможны растяжки на коже.</Text>
                  </View>
                </View>

                <View style={[styles.momDetailCard, styles.mintGradientCard]}>
                  <View style={[styles.momIcon, { backgroundColor: '#ecfdf5' }]}>
                    <FontAwesome5 name="heartbeat" size={24} color="#10b981" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Сердечно-сосудистая система</Text>
                    <Text style={styles.momDetailText}>Увеличивается объем крови. Пульс учащается. Возможны головокружения при резкой смене положения.</Text>
                    <View style={styles.momStats}>
                      <View style={styles.momStatItem}>
                        <Text style={styles.momStatValue}>+40%</Text>
                        <Text style={styles.momStatLabel}>объем крови</Text>
                      </View>
                      <View style={styles.momStatItem}>
                        <Text style={styles.momStatValue}>80-90</Text>
                        <Text style={styles.momStatLabel}>уд/мин пульс</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.momDetailCard, styles.blueGradientCard]}>
                  <View style={[styles.momIcon, { backgroundColor: '#eff6ff' }]}>
                    <FontAwesome5 name="bed" size={24} color="#3b82f6" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Сон и отдых</Text>
                    <Text style={styles.momDetailText}>Могут появиться проблемы со сном из-за увеличения живота. Частые позывы к мочеиспусканию ночью.</Text>
                    <View style={styles.sleepTips}>
                      <View style={styles.sleepTip}>
                        <FontAwesome5 name="moon" size={12} color="#3b82f6" />
                        <Text style={styles.sleepTipText}>Спи на левом боку</Text>
                      </View>
                      <View style={styles.sleepTip}>
                        <FontAwesome5 name="bed" size={12} color="#3b82f6" />
                        <Text style={styles.sleepTipText}>Используй подушку для беременных</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.momDetailCard, styles.orangeGradientCard]}>
                  <View style={[styles.momIcon, { backgroundColor: '#fff7ed' }]}>
                    <FontAwesome5 name="weight" size={24} color="#f59e0b" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Прибавка веса</Text>
                    <Text style={styles.momDetailText}>Нормальная прибавка: 5-7 кг от начала беременности. Еженедельно около 300-500 г.</Text>
                    <View style={styles.weightProgress}>
                      <View style={styles.weightInfo}>
                        <Text style={styles.weightLabel}>Рекомендуемая прибавка:</Text>
                        <Text style={styles.weightValue}>5-7 кг</Text>
                      </View>
                      <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                          <View style={[styles.progressFill, { width: '45%' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.symptomsCard}>
                  <View style={styles.symptomsHeader}>
                    <FontAwesome5 name="exclamation-circle" size={18} color="#a855f7" />
                    <Text style={styles.symptomsTitle}>Частые симптомы на {currentWeek} неделе</Text>
                  </View>
                  <View style={styles.symptomsList}>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="fire" size={24} color="#ef4444" />
                      <Text style={styles.symptomText}>Изжога</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="tired" size={24} color="#3b82f6" />
                      <Text style={styles.symptomText}>Усталость</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="shoe-prints" size={24} color="#3b82f6" />
                      <Text style={styles.symptomText}>Отеки ног</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="dizzy" size={24} color="#f59e0b" />
                      <Text style={styles.symptomText}>Головокружение</Text>
                    </View>
                  </View>
                </View>

                {/* Changes Timeline */}
                <View style={styles.timelineCard}>
                  <Text style={styles.timelineTitle}>Изменения по дням недели</Text>
                  <View style={styles.timelineList}>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#fef3f2' }]}>
                        <Text style={styles.timelineDayNumber}>1</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#fef3f2' }]}>
                        <Text style={styles.timelineDate}>День 161</Text>
                        <Text style={styles.timelineDescription}>Матка на 2,5 см выше пупка</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#fff7ed' }]}>
                        <Text style={styles.timelineDayNumber}>2</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#fff7ed' }]}>
                        <Text style={styles.timelineDate}>День 162</Text>
                        <Text style={styles.timelineDescription}>Активное формирование жировой ткани</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#fffbeb' }]}>
                        <Text style={styles.timelineDayNumber}>3</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#fffbeb' }]}>
                        <Text style={styles.timelineDate}>День 163</Text>
                        <Text style={styles.timelineDescription}>Развитие вестибулярного аппарата</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#ecfdf5' }]}>
                        <Text style={styles.timelineDayNumber}>4</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#ecfdf5' }]}>
                        <Text style={styles.timelineDate}>День 164</Text>
                        <Text style={styles.timelineDescription}>Усиление движений малыша</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#f0fdfa' }]}>
                        <Text style={styles.timelineDayNumber}>5</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#f0fdfa' }]}>
                        <Text style={styles.timelineDate}>День 165</Text>
                        <Text style={styles.timelineDescription}>Формирование режима сна</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#eff6ff' }]}>
                        <Text style={styles.timelineDayNumber}>6</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#eff6ff' }]}>
                        <Text style={styles.timelineDate}>День 166</Text>
                        <Text style={styles.timelineDescription}>Улучшение координации движений</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={[styles.timelineDay, { backgroundColor: '#faf5ff' }]}>
                        <Text style={styles.timelineDayNumber}>7</Text>
                      </View>
                      <View style={[styles.timelineContent, { backgroundColor: '#faf5ff' }]}>
                        <Text style={styles.timelineDate}>День 167</Text>
                        <Text style={styles.timelineDescription}>Возможное появление линии на животе</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'tips':
        return (
          <ScrollView 
            style={styles.tabContent} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.tipsHeaderCard}>
              <View style={styles.tipsIconContainer}>
                <FontAwesome5 name="lightbulb" size={32} color="#ffffff" />
              </View>
              <Text style={styles.tipsMainTitle}>Рекомендации на неделю</Text>
              <Text style={styles.tipsMainSubtitle}>Полезные советы для здоровья мамы и малыша</Text>
            </View>

            <View style={styles.tipsCard}>
              <View style={styles.nutritionSection}>
                <View style={styles.nutritionSectionHeader}>
                  <FontAwesome5 name="apple-alt" size={18} color="#10b981" />
                  <Text style={styles.nutritionSectionTitle}>Питание</Text>
                </View>
                
                <View style={styles.ironProductsCard}>
                  <Text style={styles.ironProductsTitle}>Продукты с железом</Text>
                  <Text style={styles.ironProductsSubtitle}>Для профилактики анемии включи в рацион:</Text>
                  
                  <View style={styles.productsGrid}>
                    <View style={styles.productItem}>
                      <Text style={styles.productEmoji}>🥩</Text>
                      <Text style={styles.productName}>Говядина</Text>
                    </View>
                    <View style={styles.productItem}>
                      <Text style={styles.productEmoji}>🥬</Text>
                      <Text style={styles.productName}>Шпинат</Text>
                    </View>
                    <View style={styles.productItem}>
                      <Text style={styles.productEmoji}>🫘</Text>
                      <Text style={styles.productName}>Чечевица</Text>
                    </View>
                    <View style={styles.productItem}>
                      <Text style={styles.productEmoji}>🥚</Text>
                      <Text style={styles.productName}>Яйца</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.calciumCard}>
                  <Text style={styles.calciumTitle}>Кальций для костей</Text>
                  <Text style={styles.calciumSubtitle}>Малыш активно формирует скелет:</Text>
                  
                  <View style={styles.calciumInfo}>
                    <View style={styles.calciumAmountContainer}>
                      <Text style={styles.calciumAmount}>1000</Text>
                      <Text style={styles.calciumLabel}>мг/день</Text>
                    </View>
                    <Text style={styles.calciumProducts}>Молоко, творог, йогурт, сыр, кунжут, миндаль</Text>
                  </View>
                </View>
                
                <View style={styles.nutritionModeCard}>
                  <Text style={styles.nutritionModeTitle}>Режим питания</Text>
                  
                  <View style={styles.nutritionModeList}>
                    <View style={styles.nutritionModeItem}>
                      <FontAwesome5 name="clock" size={16} color="#f59e0b" />
                      <Text style={styles.nutritionModeText}>Частые приемы пищи (5-6 раз)</Text>
                    </View>
                    <View style={styles.nutritionModeItem}>
                      <FontAwesome5 name="utensils" size={16} color="#f59e0b" />
                      <Text style={styles.nutritionModeText}>Небольшие порции</Text>
                    </View>
                    <View style={styles.nutritionModeItem}>
                      <FontAwesome5 name="tint" size={16} color="#f59e0b" />
                      <Text style={styles.nutritionModeText}>2-2,5 литра воды в день</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.tipSection}>
                <View style={styles.tipSectionHeader}>
                  <FontAwesome5 name="running" size={18} color="#3b82f6" />
                  <Text style={styles.tipSectionTitle}> Физическая активность</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Пренатальная йога</Text>
                  <Text style={styles.tipItemText}>15 минут в день укрепят спину и подготовят к родам</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Плавание</Text>
                  <Text style={styles.tipItemText}>2-3 раза в неделю по 30 минут снижает нагрузку на суставы</Text>
                </View>
              </View>

              <View style={styles.tipSection}>
                <View style={styles.tipSectionHeader}>
                  <FontAwesome5 name="leaf" size={18} color="#a855f7" />
                  <Text style={styles.tipSectionTitle}> Благополучие</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Уход за кожей</Text>
                  <Text style={styles.tipItemText}>Увлажняющий крем 2 раза в день, масло от растяжек</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Качество сна</Text>
                  <Text style={styles.tipItemText}>Сон на левом боку с подушкой между ног</Text>
                </View>
              </View>

              <View style={styles.tipSection}>
                <View style={styles.tipSectionHeader}>
                  <FontAwesome5 name="spa" size={18} color="#ec4899" />
                  <Text style={styles.tipSectionTitle}> Благополучие</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Уход за кожей</Text>
                  <Text style={styles.tipItemText}>Увлажняющий крем 2 раза в день, SPF защита при выходе на улицу, масло от растяжек на живот и бедра</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Качество сна</Text>
                  <View style={styles.sleepQualityGrid}>
                    <View style={styles.sleepQualityItem}>
                      <FontAwesome5 name="moon" size={16} color="#6366f1" />
                      <Text style={styles.sleepQualityText}>Сон на левом боку</Text>
                    </View>
                    <View style={styles.sleepQualityItem}>
                      <FontAwesome5 name="bed" size={16} color="#6366f1" />
                      <Text style={styles.sleepQualityText}>Подушка между ног</Text>
                    </View>
                    <View style={styles.sleepQualityItem}>
                      <FontAwesome5 name="thermometer-quarter" size={16} color="#6366f1" />
                      <Text style={styles.sleepQualityText}>Прохладная комната</Text>
                    </View>
                    <View style={styles.sleepQualityItem}>
                      <FontAwesome5 name="mobile-alt" size={16} color="#6366f1" />
                      <Text style={styles.sleepQualityText}>Без гаджетов</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Эмоциональное здоровье</Text>
                  <View style={styles.emotionalHealthList}>
                    <View style={styles.emotionalHealthItem}>
                      <FontAwesome5 name="heart" size={16} color="#f59e0b" />
                      <View style={styles.emotionalHealthContent}>
                        <Text style={styles.emotionalHealthTitle}>Общение с малышом</Text>
                        <Text style={styles.emotionalHealthText}>Разговаривай, пой колыбельные, включай классическую музыку</Text>
                      </View>
                    </View>
                    <View style={styles.emotionalHealthItem}>
                      <FontAwesome5 name="users" size={16} color="#f59e0b" />
                      <View style={styles.emotionalHealthContent}>
                        <Text style={styles.emotionalHealthTitle}>Поддержка близких</Text>
                        <Text style={styles.emotionalHealthText}>Не стесняйся просить помощи и делиться переживаниями</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.warningCard}>
                <View style={styles.warningHeader}>
                  <FontAwesome5 name="stethoscope" size={16} color="#ef4444" />
                  <Text style={styles.warningTitle}> Медицинские рекомендации</Text>
                </View>
                <Text style={styles.warningSubtitle}>Когда обратиться к врачу</Text>
                <View style={styles.warningList}>
                  <View style={styles.warningItem}>
                    <FontAwesome5 name="exclamation-triangle" size={16} color="#ef4444" />
                    <View style={styles.warningItemContent}>
                      <Text style={styles.warningItemTitle}>Кровотечения</Text>
                      <Text style={styles.warningItemText}>Любые выделения с кровью</Text>
                    </View>
                  </View>
                  <View style={styles.warningItem}>
                    <FontAwesome5 name="head-side-cough" size={16} color="#ef4444" />
                    <View style={styles.warningItemContent}>
                      <Text style={styles.warningItemTitle}>Сильные головные боли</Text>
                      <Text style={styles.warningItemText}>Особенно с нарушением зрения</Text>
                    </View>
                  </View>
                  <View style={styles.warningItem}>
                    <FontAwesome5 name="thermometer-full" size={16} color="#ef4444" />
                    <View style={styles.warningItemContent}>
                      <Text style={styles.warningItemTitle}>Температура выше 38°C</Text>
                      <Text style={styles.warningItemText}>Может навредить малышу</Text>
                    </View>
                  </View>
                  <View style={styles.warningItem}>
                    <FontAwesome5 name="baby" size={16} color="#ef4444" />
                    <View style={styles.warningItemContent}>
                      <Text style={styles.warningItemTitle}>Отсутствие движений</Text>
                      <Text style={styles.warningItemText}>Более 12 часов без шевелений</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Weekly Checklist */}
              <View style={styles.checklistCard}>
                <View style={styles.checklistHeader}>
                  <FontAwesome5 name="clipboard-check" size={18} color="#10b981" />
                  <Text style={styles.checklistTitle}>Чек-лист на {currentWeek} неделю</Text>
                </View>
                <View style={styles.checklistList}>
                  <TouchableOpacity 
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem('ultrasound')}
                  >
                    <Switch
                      value={checklistItems.ultrasound}
                      onValueChange={() => toggleChecklistItem('ultrasound')}
                      trackColor={{ false: '#d1d5db', true: '#10b981' }}
                      thumbColor={checklistItems.ultrasound ? '#ffffff' : '#f4f4f5'}
                    />
                    <Text style={styles.checklistItemText}>Записаться на УЗИ второго скрининга</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem('courses')}
                  >
                    <Switch
                      value={checklistItems.courses}
                      onValueChange={() => toggleChecklistItem('courses')}
                      trackColor={{ false: '#d1d5db', true: '#10b981' }}
                      thumbColor={checklistItems.courses ? '#ffffff' : '#f4f4f5'}
                    />
                    <Text style={styles.checklistItemText}>Начать курсы подготовки к родам</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem('brace')}
                  >
                    <Switch
                      value={checklistItems.brace}
                      onValueChange={() => toggleChecklistItem('brace')}
                      trackColor={{ false: '#d1d5db', true: '#10b981' }}
                      thumbColor={checklistItems.brace ? '#ffffff' : '#f4f4f5'}
                    />
                    <Text style={styles.checklistItemText}>Купить бандаж для поддержки живота</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem('wardrobe')}
                  >
                    <Switch
                      value={checklistItems.wardrobe}
                      onValueChange={() => toggleChecklistItem('wardrobe')}
                      trackColor={{ false: '#d1d5db', true: '#10b981' }}
                      thumbColor={checklistItems.wardrobe ? '#ffffff' : '#f4f4f5'}
                    />
                    <Text style={styles.checklistItemText}>Обновить гардероб для беременных</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem('diary')}
                  >
                    <Switch
                      value={checklistItems.diary}
                      onValueChange={() => toggleChecklistItem('diary')}
                      trackColor={{ false: '#d1d5db', true: '#10b981' }}
                      thumbColor={checklistItems.diary ? '#ffffff' : '#f4f4f5'}
                    />
                    <Text style={styles.checklistItemText}>Начать вести дневник движений малыша</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  const weekInfo = getCurrentWeekData();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={16} color="#10b981" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Календарь</Text>
          <Text style={styles.headerSubtitle}>{currentWeek} неделя беременности</Text>
        </View>
        
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome5 name="calendar-plus" size={16} color="#ec4899" />
        </TouchableOpacity>
      </View>

      {/* Week Navigation Section */}
      <View style={styles.weekNavigationSection}>
        <View style={styles.weekNavigation}>
          <TouchableOpacity 
            style={styles.weekNavButton}
            onPress={() => navigateWeek('prev')}
            disabled={currentWeek <= 1}
          >
            <FontAwesome5 name="chevron-left" size={16} color={currentWeek <= 1 ? "#d1d5db" : "#6b7280"} />
          </TouchableOpacity>
          
          <View style={styles.weekInfo}>
            <Text style={styles.weekTitle}>{currentWeek} неделя</Text>
            <Text style={styles.weekDates}>13 - 19 мая 2024</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.weekNavButton}
            onPress={() => navigateWeek('next')}
            disabled={currentWeek >= 42}
          >
            <FontAwesome5 name="chevron-right" size={16} color={currentWeek >= 42 ? "#d1d5db" : "#6b7280"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Cards Slider */}
      <View style={styles.weekScrollView}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekSlider}
          snapToInterval={width * 0.42}
          decelerationRate="fast"
        >
        {weekData.map((week) => (
          <TouchableOpacity
            key={week.week}
            style={[
              styles.weekCard,
              { backgroundColor: week.color },
              currentWeek === week.week ? styles.activeWeekCard : styles.inactiveWeekCard
            ]}
            onPress={() => setCurrentWeek(week.week)}
          >
            <View style={styles.weekCardHeader}>
              <Text style={[
                styles.weekCardNumber,
                currentWeek === week.week && styles.activeWeekCardNumber
              ]}>
                {week.week} неделя
              </Text>
              <Text style={styles.weekCardDates}>13 - 19 мая</Text>
            </View>
            
            <View style={[
              styles.weekCardIconContainer,
              currentWeek === week.week && styles.activeIconContainer
            ]}>
              <FontAwesome5 name={week.iconName} size={32} color="#1f2937" />
              <Text style={[
                styles.weekCardSizeText,
                currentWeek === week.week && styles.activeWeekCardSizeText
              ]}>
                {week.length} • {week.weight}
              </Text>
            </View>
            
            <View style={styles.weekCardInfo}>
              <Text style={styles.weekCardFruit}>Как {week.fruitName.toLowerCase()}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {/* Week Indicators */}
      <View style={styles.weekIndicators}>
        {weekData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === weekData.findIndex(w => w.week === currentWeek) ? styles.activeIndicator : styles.inactiveIndicator
            ]}
          />
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'development' && styles.activeTab]}
          onPress={() => setActiveTab('development')}
        >
          <Text style={[styles.tabText, activeTab === 'development' && styles.activeTabText]}>
            Развитие
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mom' && styles.activeTab]}
          onPress={() => setActiveTab('mom')}
        >
          <Text style={[styles.tabText, activeTab === 'mom' && styles.activeTabText]}>
            Мама
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tips' && styles.activeTab]}
          onPress={() => setActiveTab('tips')}
        >
          <Text style={[styles.tabText, activeTab === 'tips' && styles.activeTabText]}>
            Советы
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Floating AI Button */}
      <TouchableOpacity style={styles.floatingAiButton}>
        <FontAwesome5 name="robot" size={20} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 52,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0fdfa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fdf2f8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNavigationSection: {
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    marginTop: 0,
    paddingVertical: 8,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekNavButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekInfo: {
    alignItems: 'center',
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  weekDates: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  weekScrollView: {
    backgroundColor: 'transparent',
    height: 160,
    marginTop: 16,
    marginBottom: 4,
    overflow: 'hidden',
  },
  weekSlider: {
    paddingHorizontal: 16,
    height: 160,
  },
  weekCard: {
    width: width * 0.40,
    height: 140,
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    minWidth: 140,
    maxWidth: 160,
  },
  activeWeekCard: {
    borderWidth: 2,
    borderColor: '#ec4899',
    transform: [{ scale: 1 }],
    elevation: 8,
    shadowColor: '#fbcfe8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  inactiveWeekCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
  },
  weekCardHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  weekCardDates: {
    fontSize: 12,
    color: '#6b7280',
  },
  weekCardIconContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  activeIconContainer: {
    // Could add animation here
  },
  weekCardInfo: {
    alignItems: 'center',
  },
  weekCardNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeWeekCardNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  weekCardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  weekCardFruit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  weekCardStats: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeWeekCardStats: {
    color: '#ec4899',
    fontWeight: '600',
  },
  weekCardSizeText: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  activeWeekCardSizeText: {
    color: '#ec4899',
    fontWeight: '600',
  },
  // New Mom styles
  momHeaderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  momMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  momMainSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  momAvatarContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  momAvatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fdf2f8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  momCardsContainer: {
    gap: 16,
  },
  momColoredCard: {
    borderRadius: 16,
    elevation: 2,
  },
  momColoredCardInner: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
  },
  momPinkCard: {
    backgroundColor: '#fdf2f8',
  },
  momGreenCard: {
    backgroundColor: '#ecfdf5',
  },
  momBlueCard: {
    backgroundColor: '#eff6ff',
  },
  momCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 1,
  },
  momCardContent: {
    flex: 1,
  },
  momCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  momCardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  momCardAdvice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec4899',
    marginTop: 4,
  },
  momCardAdviceText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  momCardStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  momCardStat: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    minWidth: 70,
  },
  momCardStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 2,
  },
  momCardStatLabel: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Tips Tab Styles
  tipsHeaderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  tipsIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tipsMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  tipsMainSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  nutritionSection: {
    marginBottom: 16,
  },
  nutritionSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  nutritionSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  ironProductsCard: {
    backgroundColor: '#f0fdfa',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  ironProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  ironProductsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '47%',
    gap: 6,
  },
  productEmoji: {
    fontSize: 20,
  },
  productName: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '500',
    textAlign: 'center',
  },
  calciumCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  calciumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  calciumSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  calciumInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  calciumAmountContainer: {
    alignItems: 'center',
  },
  calciumAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  calciumLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  calciumProducts: {
    flex: 1,
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  nutritionModeCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#fdba74',
  },
  nutritionModeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  nutritionModeList: {
    gap: 12,
  },
  nutritionModeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nutritionModeText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  weekIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    gap: 8,
    backgroundColor: 'transparent',
    marginTop: 0,
    marginBottom: 8,
  },
  indicator: {
    borderRadius: 8,
  },
  activeIndicator: {
    width: 32,
    height: 8,
    backgroundColor: '#ec4899',
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginTop: 0,
    marginBottom: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ec4899',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  developmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  babyImageContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  babyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyEmoji: {
    fontSize: 48,
  },
  weekBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#ec4899',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  weekBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  developmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  developmentSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ec4899',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    color: '#6b7280',
  },
  developmentDetails: {
    gap: 16,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
  },
  detailIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fef3f2',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailEmoji: {
    fontSize: 24,
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  momCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 3,
  },
  momHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  momImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#fbcfe8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  momImage: {
    width: 96,
    height: 96,
  },
  momTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  momSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  momDetails: {
    gap: 16,
  },
  momDetailCard: {
    flexDirection: 'row',
    backgroundColor: '#fef3f2',
    borderRadius: 16,
    padding: 16,
  },
  momIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  momEmoji: {
    fontSize: 24,
  },
  momContent: {
    flex: 1,
  },
  momDetailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  momDetailText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  symptomsCard: {
    backgroundColor: '#f3e8ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#d8b4fe',
  },
  symptomsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomItem: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '47%',
    gap: 8,
  },
  symptomEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  symptomText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  tipSection: {
    marginBottom: 24,
  },
  tipSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tipItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  tipItemText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  warningCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  warningText: {
    fontSize: 12,
    color: '#7f1d1d',
    marginBottom: 4,
  },
  floatingAiButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#ec4899',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    zIndex: 1000,
  },
  // Gradient cards for development content
  pinkGradientCard: {
    backgroundColor: '#fdf2f8',
    borderColor: '#f9a8d4',
    borderWidth: 1,
  },
  mintGradientCard: {
    backgroundColor: '#f0fdfa',
    borderColor: '#a7f3d0',
    borderWidth: 1,
  },
  blueGradientCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
    borderWidth: 1,
  },
  orangeGradientCard: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderWidth: 1,
  },
  // Detail features
  detailFeatures: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    minWidth: '45%',
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ec4899',
  },
  featureText: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Important note
  importantNote: {
    marginTop: 12,
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
    padding: 12,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065f46',
  },
  noteText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  // Movement types
  movementTypes: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  movementItem: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    flex: 1,
  },
  movementEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  movementText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Growth stats
  growthStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  growthItem: {
    alignItems: 'center',
    flex: 1,
  },
  growthValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f59e0b',
    marginBottom: 4,
  },
  growthLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  // Milestones card
  milestonesCard: {
    backgroundColor: '#faf5ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  milestonesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  milestonesList: {
    gap: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  milestoneCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#e9d5ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
  // Mom content styles
  momStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  momStatItem: {
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    flex: 1,
  },
  momStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  momStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  sleepTips: {
    marginTop: 12,
    gap: 8,
  },
  sleepTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sleepTipText: {
    fontSize: 12,
    color: '#6b7280',
  },
  weightProgress: {
    marginTop: 12,
  },
  weightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weightLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  weightValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  // Timeline styles
  timelineCard: {
    marginTop: 24,
    backgroundColor: 'transparent',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  timelineList: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  timelineDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timelineDayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  timelineContent: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  timelineDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  // Sleep quality grid
  sleepQualityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  sleepQualityItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: '48%',
    gap: 4,
  },
  sleepQualityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  // Emotional health
  emotionalHealthList: {
    gap: 12,
    marginTop: 12,
  },
  emotionalHealthItem: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  emotionalHealthContent: {
    flex: 1,
  },
  emotionalHealthTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  emotionalHealthText: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Warning card improvements
  warningSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 12,
  },
  warningList: {
    gap: 12,
  },
  warningItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  warningItemContent: {
    flex: 1,
  },
  warningItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  warningItemText: {
    fontSize: 12,
    color: '#7f1d1d',
  },
  // Checklist
  checklistCard: {
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  checklistList: {
    gap: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  checklistItemText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
});
