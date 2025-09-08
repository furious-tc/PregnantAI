import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof FontAwesome5.glyphMap;
  xp: number;
  timeAgo: string;
  isNew: boolean;
  streak?: number;
  color: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof FontAwesome5.glyphMap;
  progress: number;
  total: number;
  unit: string;
  timeLeft: string;
  color: string;
}

const sampleAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Огненная серия',
    description: '5 дней подряд выполняешь все задания',
    iconName: 'fire',
    xp: 150,
    timeAgo: '2 часа назад',
    isNew: true,
    streak: 5,
    color: '#f59e0b'
  },
  {
    id: '2',
    title: 'Забота о себе',
    description: 'Отметила настроение 30 дней подряд',
    iconName: 'heart',
    xp: 200,
    timeAgo: '4 часа назад',
    isNew: true,
    color: '#ec4899'
  },
  {
    id: '3',
    title: 'Здоровый образ',
    description: 'Выпила 2л воды 7 дней подряд',
    iconName: 'leaf',
    xp: 100,
    timeAgo: 'Сегодня',
    isNew: true,
    color: '#10b981'
  }
];

const sampleMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Второй триместр',
    description: 'Прогресс беременности',
    iconName: 'baby',
    progress: 23,
    total: 40,
    unit: 'недель',
    timeLeft: 'До третьего триместра: 4 недели',
    color: '#a855f7'
  },
  {
    id: '2',
    title: 'Обучение',
    description: 'Курсы для мам',
    iconName: 'book',
    progress: 15,
    total: 20,
    unit: 'уроков',
    timeLeft: 'Осталось 5 уроков до сертификата',
    color: '#3b82f6'
  },
  {
    id: '3',
    title: 'Подготовка',
    description: 'Список покупок',
    iconName: 'shopping-bag',
    progress: 18,
    total: 40,
    unit: 'пунктов',
    timeLeft: 'Собрано 18 из 40 необходимых вещей',
    color: '#10b981'
  }
];

const allBadges = [
  { iconName: 'star' as keyof typeof FontAwesome5.glyphMap, name: 'Первый день', unlocked: true },
  { iconName: 'calendar-alt' as keyof typeof FontAwesome5.glyphMap, name: 'Неделя', unlocked: true },
  { iconName: 'tint' as keyof typeof FontAwesome5.glyphMap, name: 'Гидратация', unlocked: true },
  { iconName: 'moon' as keyof typeof FontAwesome5.glyphMap, name: 'Хороший сон', unlocked: true },
  { iconName: 'fire' as keyof typeof FontAwesome5.glyphMap, name: 'Активность', unlocked: true },
  { iconName: 'book' as keyof typeof FontAwesome5.glyphMap, name: 'Знания', unlocked: true },
  { iconName: 'apple-alt' as keyof typeof FontAwesome5.glyphMap, name: 'Питание', unlocked: true },
  { iconName: 'users' as keyof typeof FontAwesome5.glyphMap, name: 'Сообщество', unlocked: true },
  { iconName: 'lock' as keyof typeof FontAwesome5.glyphMap, name: 'Месяц', unlocked: false },
  { iconName: 'lock' as keyof typeof FontAwesome5.glyphMap, name: 'Эксперт', unlocked: false },
  { iconName: 'lock' as keyof typeof FontAwesome5.glyphMap, name: 'Наставник', unlocked: false },
  { iconName: 'lock' as keyof typeof FontAwesome5.glyphMap, name: 'Чемпион', unlocked: false },
];

const categoryStats = [
  { iconName: 'heart' as keyof typeof FontAwesome5.glyphMap, name: 'Здоровье', count: 12, progress: 80, color: '#ec4899' },
  { iconName: 'brain' as keyof typeof FontAwesome5.glyphMap, name: 'Обучение', count: 8, progress: 60, color: '#a855f7' },
  { iconName: 'leaf' as keyof typeof FontAwesome5.glyphMap, name: 'Питание', count: 15, progress: 90, color: '#10b981' },
  { iconName: 'dumbbell' as keyof typeof FontAwesome5.glyphMap, name: 'Активность', count: 9, progress: 70, color: '#f59e0b' },
];

export default function GamificationScreen() {
  const [currentLevel] = useState(15);
  const [currentXP] = useState(2150);
  const [nextLevelXP] = useState(3000);
  const [weeklyProgress] = useState(5);
  const [weeklyGoal] = useState(7);

  const progressPercentage = (currentXP / nextLevelXP) * 100;
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100;

  const renderAchievement = (achievement: Achievement) => (
    <View key={achievement.id} style={[styles.achievementCard, { borderColor: achievement.color + '40' }]}>
      <View style={styles.achievementContent}>
        <View style={styles.achievementIconContainer}>
          <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
            <FontAwesome5 name={achievement.iconName} size={24} color={achievement.color} />
          </View>
          {achievement.streak && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>{achievement.streak}</Text>
            </View>
          )}
          {achievement.isNew && (
            <View style={styles.newBadge} />
          )}
        </View>
        <View style={styles.achievementText}>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          <Text style={styles.achievementDescription}>{achievement.description}</Text>
          <View style={styles.achievementFooter}>
            <View style={[styles.xpBadge, { backgroundColor: achievement.color + '20' }]}>
              <Text style={[styles.xpText, { color: achievement.color }]}>+{achievement.xp} XP</Text>
            </View>
            <Text style={styles.achievementTime}>{achievement.timeAgo}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMilestone = (milestone: Milestone) => (
    <View key={milestone.id} style={[styles.milestoneCard, { borderColor: milestone.color + '40' }]}>
      <View style={styles.milestoneHeader}>
        <View style={styles.milestoneIconContainer}>
          <View style={[styles.milestoneIcon, { backgroundColor: milestone.color + '20' }]}>
            <FontAwesome5 name={milestone.iconName} size={20} color={milestone.color} />
          </View>
        </View>
        <View style={styles.milestoneInfo}>
          <Text style={styles.milestoneTitle}>{milestone.title}</Text>
          <Text style={styles.milestoneDescription}>{milestone.description}</Text>
        </View>
        <View style={styles.milestoneProgress}>
          <Text style={[styles.milestonePercentage, { color: milestone.color }]}>
            {Math.round((milestone.progress / milestone.total) * 100)}%
          </Text>
          <Text style={styles.milestoneCount}>{milestone.progress}/{milestone.total} {milestone.unit}</Text>
        </View>
      </View>
      <View style={styles.milestoneProgressBar}>
        <View style={[styles.milestoneProgressFill, { 
          width: `${(milestone.progress / milestone.total) * 100}%`,
          backgroundColor: milestone.color 
        }]} />
      </View>
      <Text style={styles.milestoneTimeLeft}>{milestone.timeLeft}</Text>
    </View>
  );

  const renderCategory = (category: typeof categoryStats[0]) => (
    <View key={category.name} style={styles.categoryCard}>
      <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
        <FontAwesome5 name={category.iconName} size={24} color={category.color} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={[styles.categoryCount, { color: category.color }]}>{category.count}</Text>
      <Text style={styles.categoryLabel}>достижений</Text>
      <View style={styles.categoryProgressBar}>
        <View style={[styles.categoryProgressFill, { 
          width: `${category.progress}%`,
          backgroundColor: category.color 
        }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={16} color="#ec4899" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Достижения</Text>
            <Text style={styles.headerSubtitle}>Твой прогресс</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.shareButton}>
            <FontAwesome5 name="share-alt" size={16} color="#10b981" />
          </TouchableOpacity>
          <Image 
            source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Level Progress Section */}
        <LinearGradient
          colors={['#fef7f0', '#fdf2f8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.levelSection}
        >
          <View style={styles.levelContainer}>
            <View style={styles.levelIconContainer}>
              <View style={styles.levelIcon}>
                <Text style={styles.levelNumber}>{currentLevel}</Text>
                <Text style={styles.levelLabel}>Уровень</Text>
              </View>
              <View style={styles.crownIcon}>
                <FontAwesome5 name="crown" size={16} color="#92400e" />
              </View>
            </View>
            
            <Text style={styles.levelTitle}>Опытная мама</Text>
            <Text style={styles.levelSubtitle}>До следующего уровня осталось {nextLevelXP - currentXP} XP</Text>
            
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Прогресс уровня</Text>
                <Text style={styles.progressValue}>{currentXP} / {nextLevelXP} XP</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}% завершено</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Weekly Progress Section */}
        <View style={styles.weeklySection}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyTitle}>Прогресс недели</Text>
            <Text style={styles.weeklyCount}>{weeklyProgress}/{weeklyGoal} дней</Text>
          </View>
          
          <View style={styles.weeklyCard}>
            <View style={styles.weeklyDays}>
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                <View key={day} style={styles.weeklyDay}>
                  <View style={[
                    styles.weeklyDayIcon, 
                    index < weeklyProgress ? styles.weeklyDayCompleted : styles.weeklyDayPending
                  ]}>
                    {index < weeklyProgress ? (
                      <FontAwesome5 name="check" size={12} color="#ffffff" />
                    ) : (
                      <View style={styles.weeklyDayDot} />
                    )}
                  </View>
                  <Text style={styles.weeklyDayLabel}>{day}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.weeklyProgressCard}>
              <View style={styles.weeklyProgressHeader}>
                <Text style={styles.weeklyProgressLabel}>Недельная цель</Text>
                <Text style={styles.weeklyProgressValue}>{Math.round(weeklyPercentage)}%</Text>
              </View>
              <View style={styles.weeklyProgressBar}>
                <View style={[styles.weeklyProgressFill, { width: `${weeklyPercentage}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Recent Achievements Section */}
        <View style={[styles.section, { backgroundColor: '#fef7f0' }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Новые достижения</Text>
            <Text style={styles.newCount}>+3 сегодня</Text>
          </View>
          <View style={styles.achievementsList}>
            {sampleAchievements.map(renderAchievement)}
          </View>
        </View>

        {/* Milestones Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Важные вехи</Text>
          <View style={styles.milestonesList}>
            {sampleMilestones.map(renderMilestone)}
          </View>
        </View>

        {/* Category Achievements Section */}
        <View style={[styles.section, { backgroundColor: '#f0fdfa' }]}>
          <Text style={styles.sectionTitle}>Достижения по категориям</Text>
          <View style={styles.categoriesGrid}>
            {categoryStats.map(renderCategory)}
          </View>
        </View>

        {/* All Badges Section */}
        <View style={styles.section}>
          <View style={styles.badgesHeader}>
            <Text style={styles.sectionTitle}>Все достижения</Text>
            <Text style={styles.badgesCount}>44 из 60</Text>
          </View>
          <View style={styles.badgesGrid}>
            {allBadges.map((badge, index) => (
              <View key={index} style={styles.badgeItem}>
                <View style={[
                  styles.badgeIcon, 
                  { backgroundColor: badge.unlocked ? '#f59e0b' : '#d1d5db' }
                ]}>
                  <FontAwesome5 name={badge.iconName} size={20} color="#ffffff" />
                </View>
                <Text style={[
                  styles.badgeName,
                  { color: badge.unlocked ? '#1f2937' : '#9ca3af' }
                ]}>
                  {badge.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Current Challenges Section */}
        <View style={[styles.section, { backgroundColor: '#f0f9ff' }]}>
          <Text style={styles.sectionTitle}>Текущие вызовы</Text>
          
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeIconContainer}>
                <View style={styles.challengeIcon}>
                  <FontAwesome5 name="trophy" size={20} color="#3b82f6" />
                </View>
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>30-дневный вызов</Text>
                <Text style={styles.challengeDescription}>Ежедневные задания</Text>
              </View>
              <View style={styles.challengeProgress}>
                <Text style={styles.challengeCount}>23/30</Text>
                <Text style={styles.challengeUnit}>дней</Text>
              </View>
            </View>
            <View style={styles.challengeProgressBar}>
              <View style={[styles.challengeProgressFill, { width: '77%' }]} />
            </View>
            <View style={styles.challengeFooter}>
              <Text style={styles.challengeTimeLeft}>Осталось 7 дней</Text>
              <View style={styles.challengeReward}>
                <Text style={styles.challengeRewardText}>Награда: 500 XP</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.sectionTitle}>Рейтинг друзей</Text>
            <TouchableOpacity>
              <Text style={styles.inviteButton}>Пригласить</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.leaderboardList}>
            <View style={[styles.leaderboardItem, styles.leaderboardItemFirst]}>
              <View style={styles.leaderboardRank}>
                <Image 
                  source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg' }}
                  style={styles.leaderboardAvatar}
                />
                <View style={styles.leaderboardCrown}>
                  <FontAwesome5 name="crown" size={12} color="#92400e" />
                </View>
              </View>
              <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardName}>Ты</Text>
                <Text style={styles.leaderboardDescription}>1 место на этой неделе</Text>
              </View>
              <View style={styles.leaderboardScore}>
                <Text style={styles.leaderboardScoreValue}>2,150</Text>
                <Text style={styles.leaderboardScoreUnit}>XP</Text>
              </View>
            </View>
            
            <View style={styles.leaderboardItem}>
              <View style={styles.leaderboardRank}>
                <Image 
                  source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg' }}
                  style={styles.leaderboardAvatar}
                />
                <View style={styles.leaderboardRankBadge}>
                  <Text style={styles.leaderboardRankText}>2</Text>
                </View>
              </View>
              <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardName}>Анна</Text>
                <Text style={styles.leaderboardDescription}>26 неделя беременности</Text>
              </View>
              <View style={styles.leaderboardScore}>
                <Text style={styles.leaderboardScoreValue}>1,890</Text>
                <Text style={styles.leaderboardScoreUnit}>XP</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={[styles.section, { backgroundColor: '#fef7f0' }]}>
          <Text style={styles.sectionTitle}>Награды и подарки</Text>
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardCard}>
              <View style={styles.rewardIcon}>
                <FontAwesome5 name="gift" size={24} color="#ffffff" />
              </View>
              <Text style={styles.rewardTitle}>Скидка 20%</Text>
              <Text style={styles.rewardDescription}>На товары для мам</Text>
              <TouchableOpacity style={styles.rewardButton}>
                <Text style={styles.rewardButtonText}>Получить</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.rewardCard}>
              <View style={styles.rewardIcon}>
                <FontAwesome5 name="medal" size={24} color="#ffffff" />
              </View>
              <Text style={styles.rewardTitle}>Сертификат</Text>
              <Text style={styles.rewardDescription}>Курс "Подготовка к родам"</Text>
              <TouchableOpacity style={[styles.rewardButton, styles.rewardButtonDisabled]}>
                <Text style={styles.rewardButtonText}>Скоро</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#fce7f3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fbcfe8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#ec4899',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shareButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0fdfa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    color: '#10b981',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fbcfe8',
  },
  scrollView: {
    flex: 1,
  },
  levelSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelIconContainer: {
    marginBottom: 16,
  },
  levelIcon: {
    width: 128,
    height: 128,
    backgroundColor: '#ec4899',
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fbcfe8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  levelLabel: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  crownIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: '#fbbf24',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownText: {
    fontSize: 16,
    color: '#92400e',
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  levelSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a855f7',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginBottom: 8,
  },
  progressFill: {
    height: 12,
    backgroundColor: '#ec4899',
    borderRadius: 6,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  weeklySection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  weeklyCount: {
    fontSize: 14,
    color: '#a855f7',
    fontWeight: '500',
  },
  weeklyCard: {
    backgroundColor: '#fdf2f8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  weeklyDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weeklyDay: {
    alignItems: 'center',
  },
  weeklyDayIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  weeklyDayCompleted: {
    backgroundColor: '#10b981',
  },
  weeklyDayPending: {
    backgroundColor: '#d1d5db',
  },
  weeklyDayCheck: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  weeklyDayDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  weeklyDayLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  weeklyProgressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
  },
  weeklyProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weeklyProgressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  weeklyProgressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  weeklyProgressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  weeklyProgressFill: {
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  newCount: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '500',
  },
  achievementsList: {
    gap: 16,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  achievementIconContainer: {
    marginRight: 16,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconText: {
    fontSize: 24,
  },
  streakBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 16,
    height: 16,
    backgroundColor: '#fbbf24',
    borderRadius: 8,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  achievementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  xpBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '500',
  },
  achievementTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  milestonesList: {
    gap: 16,
  },
  milestoneCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneIconContainer: {
    marginRight: 12,
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneIconText: {
    fontSize: 20,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  milestoneProgress: {
    alignItems: 'flex-end',
  },
  milestonePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  milestoneCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  milestoneProgressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    marginBottom: 8,
  },
  milestoneProgressFill: {
    height: 12,
    borderRadius: 6,
  },
  milestoneTimeLeft: {
    fontSize: 12,
    color: '#6b7280',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 80) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  categoryProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
  },
  categoryProgressFill: {
    height: 6,
    borderRadius: 3,
  },
  badgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  badgesCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  badgeItem: {
    alignItems: 'center',
    width: (width - 80) / 4,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeIconText: {
    fontSize: 20,
    color: '#ffffff',
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3b82f640',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeIconContainer: {
    marginRight: 12,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f620',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeIconText: {
    fontSize: 20,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  challengeProgress: {
    alignItems: 'flex-end',
  },
  challengeCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  challengeUnit: {
    fontSize: 12,
    color: '#9ca3af',
  },
  challengeProgressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    marginBottom: 8,
  },
  challengeProgressFill: {
    height: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeTimeLeft: {
    fontSize: 12,
    color: '#6b7280',
  },
  challengeReward: {
    backgroundColor: '#3b82f620',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  challengeRewardText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inviteButton: {
    fontSize: 14,
    color: '#a855f7',
    fontWeight: '500',
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  leaderboardItemFirst: {
    backgroundColor: '#fef3c7',
    borderColor: '#fbbf2440',
  },
  leaderboardRank: {
    marginRight: 16,
  },
  leaderboardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  leaderboardCrown: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardCrownText: {
    fontSize: 12,
    color: '#92400e',
  },
  leaderboardRankBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#9ca3af',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardRankText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  leaderboardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  leaderboardScore: {
    alignItems: 'flex-end',
  },
  leaderboardScoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  leaderboardScoreUnit: {
    fontSize: 12,
    color: '#9ca3af',
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  rewardIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#ec4899',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rewardIconText: {
    fontSize: 24,
    color: '#ffffff',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  rewardButton: {
    backgroundColor: '#ec489920',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rewardButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  rewardButtonText: {
    fontSize: 12,
    color: '#ec4899',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});
