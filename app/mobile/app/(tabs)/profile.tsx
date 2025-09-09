import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Modal,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyTips: true,
    doctorReminders: true,
    vitamins: true,
    community: false,
  });

  const renderInfoCard = (iconName: keyof typeof FontAwesome5.glyphMap, title: string, value: string, color: string, onEdit: () => void) => (
    <View style={[styles.infoCard, { backgroundColor: color + '20', borderColor: color + '40' }]}>
      <View style={styles.infoCardContent}>
        <View style={[styles.infoIcon, { backgroundColor: color + '20' }]}>
          <FontAwesome5 name={iconName} size={16} color={color} />
        </View>
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>{title}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onEdit}>
        <Text style={[styles.editButton, { color }]}>Изменить</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNotificationItem = (iconName: keyof typeof FontAwesome5.glyphMap, title: string, subtitle: string, value: boolean, onToggle: (value: boolean) => void, color: string) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationContent}>
        <View style={[styles.notificationIcon, { backgroundColor: color + '20' }]}>
          <FontAwesome5 name={iconName} size={16} color={color} />
        </View>
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{title}</Text>
          <Text style={styles.notificationSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#f3f4f6', true: color }}
        thumbColor={value ? '#ffffff' : '#ffffff'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome5 name="arrow-left" size={16} color="#10b981" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Профиль</Text>
          <Text style={styles.headerSubtitle}>Настройки аккаунта</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome5 name="cog" size={16} color="#10b981" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Hero Section */}
        <LinearGradient
          colors={['#fef7f0', '#fdf2f8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.photoUploadButton}
              onPress={() => setShowPhotoModal(true)}
            >
              <FontAwesome5 name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Анна Петрова</Text>
          <Text style={styles.userInfo}>23 недели беременности</Text>
          <Text style={styles.dueDate}>Дата родов: 15 сентября</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#ec4899' }]}>161</Text>
              <Text style={styles.statLabel}>Дней в пути</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>89%</Text>
              <Text style={styles.statLabel}>Выполнено</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>12</Text>
              <Text style={styles.statLabel}>Визитов</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Personal Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Личная информация</Text>
          {renderInfoCard('user', 'Имя и фамилия', 'Анна Петрова', '#ec4899', () => {})}
          {renderInfoCard('envelope', 'Email', 'anna.petrova@email.com', '#10b981', () => {})}
          {renderInfoCard('phone', 'Телефон', '+7 (999) 123-45-67', '#3b82f6', () => {})}
          {renderInfoCard('birthday-cake', 'Дата рождения', '15 марта 1992', '#f59e0b', () => {})}
        </View>

        {/* Pregnancy Info Section */}
        <View style={[styles.section, { backgroundColor: '#fdf2f8' }]}>
          <Text style={styles.sectionTitle}>Информация о беременности</Text>
          {renderInfoCard('calendar-alt', 'Дата последней менструации', '15 октября 2023', '#ec4899', () => {})}
          {renderInfoCard('baby', 'Предполагаемая дата родов', '15 сентября 2024', '#10b981', () => {})}
          {renderInfoCard('baby', 'Количество детей', 'Первая беременность', '#3b82f6', () => {})}
        </View>

        {/* Language Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Язык и регион</Text>
          <View style={styles.languageCard}>
            <View style={styles.languageHeader}>
              <View style={styles.languageIcon}>
                <FontAwesome5 name="globe" size={16} color="#a855f7" />
              </View>
              <Text style={styles.languageTitle}>Язык приложения</Text>
              <Text style={styles.languageValue}>Русский</Text>
            </View>
            
            <View style={styles.languageOptions}>
              <TouchableOpacity style={[styles.languageOption, styles.languageOptionActive]}>
                <Text style={styles.languageFlag}>🇷🇺</Text>
                <Text style={[styles.languageOptionText, styles.languageOptionTextActive]}>Русский</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageOption}>
                <Text style={styles.languageFlag}>🇺🇸</Text>
                <Text style={styles.languageOptionText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageOption}>
                <Text style={styles.languageFlag}>🇪🇸</Text>
                <Text style={styles.languageOptionText}>Español</Text>
              </TouchableOpacity>
            </View>
          </View>

          {renderInfoCard('globe-americas', 'Часовой пояс', 'Москва (GMT+3)', '#3b82f6', () => {})}
          {renderInfoCard('ruler', 'Единицы измерения', 'Метрическая система', '#10b981', () => {})}
        </View>

        {/* Subscription Section */}
        <View style={[styles.section, { backgroundColor: '#fef7f0' }]}>
          <Text style={styles.sectionTitle}>Подписка</Text>
          
          <View style={styles.premiumCard}>
            <View style={styles.premiumHeader}>
              <View style={styles.premiumIcon}>
                <FontAwesome5 name="crown" size={20} color="#ffffff" />
              </View>
              <View style={styles.premiumInfo}>
                <Text style={styles.premiumTitle}>Premium</Text>
                <Text style={styles.premiumSubtitle}>Активна до 15.09.2024</Text>
              </View>
              <View style={styles.premiumStatus}>
                <Text style={styles.premiumStatusText}>Активна</Text>
              </View>
            </View>
            
            <View style={styles.premiumFeatures}>
              <View style={styles.premiumFeature}>
                <FontAwesome5 name="robot" size={18} color="#1f2937" />
                <Text style={styles.premiumFeatureText}>AI-консультант</Text>
              </View>
              <View style={styles.premiumFeature}>
                <FontAwesome5 name="chart-bar" size={18} color="#1f2937" />
                <Text style={styles.premiumFeatureText}>Детальная аналитика</Text>
              </View>
              <View style={styles.premiumFeature}>
                <FontAwesome5 name="users" size={18} color="#1f2937" />
                <Text style={styles.premiumFeatureText}>Приватные группы</Text>
              </View>
              <View style={styles.premiumFeature}>
                <FontAwesome5 name="cloud" size={18} color="#1f2937" />
                <Text style={styles.premiumFeatureText}>Безлимитное хранение</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Управлять подпиской</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Settings Section */}
        <View style={[styles.section, { backgroundColor: '#fdf2f8' }]}>
          <Text style={styles.sectionTitle}>Уведомления</Text>
          {renderNotificationItem('bell', 'Ежедневные советы', 'Получать полезные советы каждый день', notifications.dailyTips, (value) => setNotifications({...notifications, dailyTips: value}), '#ec4899')}
          {renderNotificationItem('calendar-alt', 'Напоминания о визитах', 'За 1 день до приема у врача', notifications.doctorReminders, (value) => setNotifications({...notifications, doctorReminders: value}), '#10b981')}
          {renderNotificationItem('pills', 'Прием витаминов', 'Ежедневно в 9:00', notifications.vitamins, (value) => setNotifications({...notifications, vitamins: value}), '#3b82f6')}
          {renderNotificationItem('users', 'Сообщества', 'Новые сообщения в группах', notifications.community, (value) => setNotifications({...notifications, community: value}), '#a855f7')}
        </View>

        {/* Support Section */}
        <View style={[styles.section, { backgroundColor: '#f0f9ff' }]}>
          <Text style={styles.sectionTitle}>Поддержка</Text>
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIcon}>
              <FontAwesome5 name="question-circle" size={16} color="#3b82f6" />
            </View>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Часто задаваемые вопросы</Text>
              <Text style={styles.supportSubtitle}>Найдите ответы на популярные вопросы</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIcon}>
              <FontAwesome5 name="comments" size={16} color="#3b82f6" />
            </View>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Чат с поддержкой</Text>
              <Text style={styles.supportSubtitle}>Свяжитесь с нашей командой</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <View style={styles.appInfoCard}>
            <View style={styles.appIcon}>
              <FontAwesome5 name="heart" size={24} color="#ffffff" />
            </View>
            <Text style={styles.appName}>BabyJoy</Text>
            <Text style={styles.appVersion}>Версия 2.1.0</Text>
            
            <View style={styles.appDetails}>
              <View style={styles.appDetail}>
                <Text style={styles.appDetailLabel}>Последнее обновление</Text>
                <Text style={styles.appDetailValue}>15 мая 2024</Text>
              </View>
              <View style={styles.appDetail}>
                <Text style={styles.appDetailLabel}>Размер приложения</Text>
                <Text style={styles.appDetailValue}>45.2 МБ</Text>
              </View>
              <View style={styles.appDetail}>
                <Text style={styles.appDetailLabel}>Разработчик</Text>
                <Text style={styles.appDetailValue}>BabyJoy Team</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.legalButtons}>
            <TouchableOpacity style={styles.legalButton}>
              <FontAwesome5 name="file-alt" size={18} color="#1f2937" />
              <Text style={styles.legalButtonText}>Условия использования</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalButton}>
              <FontAwesome5 name="shield-alt" size={18} color="#1f2937" />
              <Text style={styles.legalButtonText}>Политика конфиденциальности</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.copyright}>© 2024 BabyJoy. Все права защищены.</Text>
          <Text style={styles.copyrightSub}>Сделано с любовью для будущих мам</Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Photo Upload Modal */}
      <Modal
        visible={showPhotoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Изменить фото профиля</Text>
            
            <TouchableOpacity style={styles.modalOption}>
              <View style={styles.modalOptionIcon}>
                <FontAwesome5 name="camera" size={16} color="#ec4899" />
              </View>
              <Text style={styles.modalOptionText}>Сделать фото</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalOption}>
              <View style={styles.modalOptionIcon}>
                <FontAwesome5 name="image" size={16} color="#ec4899" />
              </View>
              <Text style={styles.modalOptionText}>Выбрать из галереи</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalOption}>
              <View style={styles.modalOptionIcon}>
                <FontAwesome5 name="trash" size={16} color="#ec4899" />
              </View>
              <Text style={styles.modalOptionText}>Удалить фото</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCancel}
              onPress={() => setShowPhotoModal(false)}
            >
              <Text style={styles.modalCancelText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f0fdfa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#10b981',
  },
  headerCenter: {
    alignItems: 'center',
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
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  photoUploadButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    backgroundColor: '#ec4899',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  editButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  languageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  languageIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#a855f720',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageIconText: {
    fontSize: 16,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
    marginLeft: 12,
  },
  languageValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  languageOptions: {
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  languageOptionActive: {
    backgroundColor: '#fdf2f8',
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  languageOptionTextActive: {
    color: '#ec4899',
  },
  premiumCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#f59e0b40',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f59e0b',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  premiumIconText: {
    fontSize: 20,
    color: '#ffffff',
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  premiumStatus: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  premiumStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  premiumFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  premiumFeature: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  premiumFeatureIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  premiumFeatureText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  premiumButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 16,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  supportIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f620',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  supportIconText: {
    fontSize: 16,
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  supportArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  appInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  appIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#ec4899',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appIconText: {
    fontSize: 24,
    color: '#ffffff',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  appDetails: {
    width: '100%',
    gap: 12,
  },
  appDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  appDetailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  legalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  legalButton: {
    flex: 1,
    backgroundColor: '#fdf2f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  legalButtonIcon: {
    fontSize: 18,
    marginBottom: 8,
  },
  legalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  copyrightSub: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fdf2f8',
    borderRadius: 12,
    marginBottom: 12,
  },
  modalOptionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#fce7f3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalOptionIconText: {
    fontSize: 16,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  modalCancel: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
});
