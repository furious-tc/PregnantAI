import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
  { week: 21, fruitName: 'Банан', length: '26 см', weight: '360 г', iconName: 'apple-alt', color: '#fed7aa' },
  { week: 22, fruitName: 'Кукуруза', length: '27 см', weight: '430 г', iconName: 'seedling', color: '#fef7f0' },
  { week: 23, fruitName: 'Папайя', length: '28 см', weight: '500 г', iconName: 'lemon', color: '#fdf2f8' },
  { week: 24, fruitName: 'Кукуруза', length: '30 см', weight: '600 г', iconName: 'seedling', color: '#f0fdfa' },
  { week: 25, fruitName: 'Брюква', length: '34 см', weight: '660 г', iconName: 'leaf', color: '#f0f9ff' },
];

type TabType = 'development' | 'mom' | 'tips';

export const CalendarScreen: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(23);
  const [activeTab, setActiveTab] = useState<TabType>('development');

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

  const renderTabContent = () => {
    const weekInfo = getCurrentWeekData();
    
    switch (activeTab) {
      case 'development':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.developmentCard}>
              <View style={styles.babyImageContainer}>
                <View style={[styles.babyImage, { backgroundColor: weekInfo.color }]}>
                  <FontAwesome5 name={weekInfo.iconName} size={48} color="#1f2937" />
                </View>
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
              <View style={styles.detailCard}>
                <View style={styles.detailIcon}>
                  <FontAwesome5 name="head-side-brain" size={24} color="#ec4899" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Мозг и нервная система</Text>
                  <Text style={styles.detailText}>Быстрое развитие мозга. Формируются извилины и борозды. Малыш начинает различать звуки.</Text>
                </View>
              </View>

              <View style={styles.detailCard}>
                <View style={styles.detailIcon}>
                  <FontAwesome5 name="wind" size={24} color="#10b981" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Дыхательная система</Text>
                  <Text style={styles.detailText}>Легкие продолжают созревать. Формируются альвеолы. Малыш делает дыхательные движения.</Text>
                </View>
              </View>

              <View style={styles.detailCard}>
                <View style={styles.detailIcon}>
                  <FontAwesome5 name="hand-rock" size={24} color="#3b82f6" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>Движения и рефлексы</Text>
                  <Text style={styles.detailText}>Хватательный рефлекс укрепляется. Малыш может сжимать кулачки, касаться лица.</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'mom':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.momCard}>
              <Text style={styles.momTitle}>Изменения в организме мамы</Text>
              <Text style={styles.momSubtitle}>Что происходит на {currentWeek} неделе</Text>
              
              <View style={styles.momDetails}>
                <View style={styles.momDetailCard}>
                  <View style={styles.momIcon}>
                    <FontAwesome5 name="baby" size={24} color="#ec4899" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Размер живота</Text>
                    <Text style={styles.momDetailText}>Матка поднимается выше пупка. Живот заметно округляется. Возможны растяжки на коже.</Text>
                  </View>
                </View>

                <View style={styles.momDetailCard}>
                  <View style={styles.momIcon}>
                    <FontAwesome5 name="heart" size={24} color="#ef4444" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Сердечно-сосудистая система</Text>
                    <Text style={styles.momDetailText}>Увеличивается объем крови. Пульс учащается. Возможны головокружения.</Text>
                  </View>
                </View>

                <View style={styles.momDetailCard}>
                  <View style={styles.momIcon}>
                    <FontAwesome5 name="bed" size={24} color="#3b82f6" />
                  </View>
                  <View style={styles.momContent}>
                    <Text style={styles.momDetailTitle}>Сон и отдых</Text>
                    <Text style={styles.momDetailText}>Могут появиться проблемы со сном из-за увеличения живота. Спите на левом боку.</Text>
                  </View>
                </View>

                <View style={styles.symptomsCard}>
                  <Text style={styles.symptomsTitle}>Частые симптомы:</Text>
                  <View style={styles.symptomsList}>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="fire" size={16} color="#f59e0b" />
                      <Text style={styles.symptomText}>Изжога</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="bed" size={16} color="#6b7280" />
                      <Text style={styles.symptomText}>Усталость</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="walking" size={16} color="#3b82f6" />
                      <Text style={styles.symptomText}>Отеки ног</Text>
                    </View>
                    <View style={styles.symptomItem}>
                      <FontAwesome5 name="spinner" size={16} color="#a855f7" />
                      <Text style={styles.symptomText}>Головокружение</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'tips':
        return (
          <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Рекомендации на {currentWeek} неделю</Text>
              
              <View style={styles.tipSection}>
                <View style={styles.tipSectionHeader}>
                  <FontAwesome5 name="apple-alt" size={18} color="#10b981" />
                  <Text style={styles.tipSectionTitle}> Питание</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Продукты с железом</Text>
                  <Text style={styles.tipItemText}>Говядина, шпинат, чечевица, яйца - для профилактики анемии</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipItemTitle}>Кальций</Text>
                  <Text style={styles.tipItemText}>1000 мг/день: молоко, творог, йогурт, сыр, кунжут</Text>
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

              <View style={styles.warningCard}>
                <View style={styles.warningHeader}>
                  <FontAwesome5 name="exclamation-triangle" size={16} color="#ef4444" />
                  <Text style={styles.warningTitle}> Когда обратиться к врачу</Text>
                </View>
                <Text style={styles.warningText}>• Кровотечения любого характера</Text>
                <Text style={styles.warningText}>• Сильные головные боли с нарушением зрения</Text>
                <Text style={styles.warningText}>• Температура выше 38°C</Text>
                <Text style={styles.warningText}>• Отсутствие движений более 12 часов</Text>
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
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigateWeek('prev')}
          disabled={currentWeek <= 1}
        >
          <FontAwesome5 name="chevron-left" size={18} color={currentWeek <= 1 ? "#d1d5db" : "#374151"} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{currentWeek} неделя</Text>
          <Text style={styles.headerSubtitle}>Календарь беременности</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigateWeek('next')}
          disabled={currentWeek >= 42}
        >
          <FontAwesome5 name="chevron-right" size={18} color={currentWeek >= 42 ? "#d1d5db" : "#374151"} />
        </TouchableOpacity>
      </View>

      {/* Week Cards Slider */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekSlider}
        snapToInterval={width * 0.8}
        decelerationRate="fast"
      >
        {weekData.map((week) => (
          <TouchableOpacity
            key={week.week}
            style={[
              styles.weekCard,
              { backgroundColor: week.color },
              currentWeek === week.week && styles.activeWeekCard
            ]}
            onPress={() => setCurrentWeek(week.week)}
          >
            <Text style={styles.weekCardNumber}>{week.week} неделя</Text>
            <FontAwesome5 name={week.iconName} size={32} color="#1f2937" />
            <Text style={styles.weekCardFruit}>Как {week.fruitName.toLowerCase()}</Text>
            <Text style={styles.weekCardStats}>{week.length} • {week.weight}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
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
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  navButtonDisabled: {
    color: '#d1d5db',
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
  weekSlider: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  weekCard: {
    width: width * 0.7,
    height: 140,
    borderRadius: 20,
    padding: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  activeWeekCard: {
    borderWidth: 3,
    borderColor: '#ec4899',
  },
  weekCardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  weekCardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  weekCardFruit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  weekCardStats: {
    fontSize: 12,
    color: '#6b7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
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
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  developmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  babyImageContainer: {
    marginBottom: 20,
  },
  babyImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    marginBottom: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    backgroundColor: '#fef7f0',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: '45%',
  },
  symptomEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  symptomText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
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
});
