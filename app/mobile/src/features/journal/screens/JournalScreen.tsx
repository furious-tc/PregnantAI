import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Modal,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface JournalEntry {
  id: string;
  type: 'text' | 'photo' | 'tracker';
  title: string;
  content: string;
  date: string;
  time: string;
  likes: number;
  comments: number;
  week: number;
  category: string;
  image?: string;
  stats?: {
    value: string;
    unit: string;
    change?: string;
    status?: string;
  };
}

const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    type: 'text',
    title: 'Первые толчки!',
    content: 'Сегодня впервые почувствовала, как малыш толкается! Это такое невероятное ощущение 💕 Сидела за работой и вдруг почувствовала легкие движения внизу живота. Сначала подумала, что это просто газики, но потом поняла - это мой малыш!',
    date: 'Сегодня',
    time: '14:30',
    likes: 12,
    comments: 3,
    week: 23,
    category: 'baby'
  },
  {
    id: '2',
    type: 'photo',
    title: 'Фото животика',
    content: '23 недели! Животик растет с каждым днем. Уже не могу скрыть его под свободной одеждой 😊 Чувствую себя прекрасно!',
    date: 'Вчера',
    time: '19:45',
    likes: 24,
    comments: 8,
    week: 23,
    category: 'photo',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png'
  },
  {
    id: '3',
    type: 'tracker',
    title: 'Трекер веса',
    content: 'Вес набираю постепенно, врач говорит, что все в норме. Стараюсь питаться правильно и не переедать.',
    date: '2 дня назад',
    time: '10:00',
    likes: 8,
    comments: 2,
    week: 23,
    category: 'weight',
    stats: {
      value: '68.5',
      unit: 'кг',
      change: '+0.5 кг',
      status: 'В норме'
    }
  }
];

export const JournalScreen: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return 'heart';
      case 'photo': return 'camera';
      case 'tracker': return 'chart-bar';
      default: return 'edit';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return '#ec4899';
      case 'photo': return '#10b981';
      case 'tracker': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'baby': return 'baby';
      case 'photo': return 'image';
      case 'weight': return 'weight';
      default: return 'edit';
    }
  };

  const renderEntry = (entry: JournalEntry) => {
    const typeColor = getTypeColor(entry.type);
    
    return (
      <View key={entry.id} style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.entryTitleRow}>
            <View style={[styles.typeIcon, { backgroundColor: typeColor }]}>
              <FontAwesome5 name={getTypeIcon(entry.type) as keyof typeof FontAwesome5.glyphMap} size={16} color="#ffffff" />
            </View>
            <View style={styles.entryTitleContainer}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDateTime}>{entry.date}, {entry.time}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>

        {entry.image && (
          <Image source={{ uri: entry.image }} style={styles.entryImage} />
        )}

        {entry.stats && (
          <View style={[styles.statsContainer, { backgroundColor: typeColor + '20' }]}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Текущий вес</Text>
              <Text style={[styles.statsValue, { color: typeColor }]}>
                {entry.stats.value} {entry.stats.unit}
              </Text>
            </View>
            <View style={styles.statsSubRow}>
              <Text style={styles.statsChange}>Прибавка за неделю: {entry.stats.change}</Text>
              <Text style={[styles.statsStatus, { color: '#10b981' }]}>{entry.stats.status}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: typeColor }]} />
            </View>
          </View>
        )}

        <Text style={styles.entryContent}>{entry.content}</Text>

        <View style={styles.entryFooter}>
          <View style={styles.entryActions}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="heart" size={14} color="#ec4899" />
              <Text style={styles.actionCount}>{entry.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="comments" size={14} color="#3b82f6" />
              <Text style={styles.actionCount}>{entry.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="share-alt" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.entryCategory}>
            <View style={[styles.categoryIcon, { backgroundColor: typeColor + '20' }]}>
              <FontAwesome5 name={getCategoryIcon(entry.category) as keyof typeof FontAwesome5.glyphMap} size={12} color={typeColor} />
            </View>
            <Text style={styles.categoryText}>{entry.week} неделя</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={16} color="#ec4899" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Мой дневник</Text>
            <Text style={styles.headerSubtitle}>Записи и воспоминания</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome5 name="search" size={16} color="#10b981" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome5 name="cog" size={16} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <LinearGradient
          colors={['#fef7f0', '#fdf2f8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsSection}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#ec4899' }]}>47</Text>
              <Text style={styles.statLabel}>Записей</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>23</Text>
              <Text style={styles.statLabel}>Фото</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>12</Text>
              <Text style={styles.statLabel}>Треков</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Add Section */}
        <View style={styles.quickAddSection}>
          <View style={styles.quickAddContainer}>
            <Text style={styles.quickAddTitle}>Быстрое добавление</Text>
            <View style={styles.quickAddButtons}>
              <TouchableOpacity style={styles.quickAddButton}>
                <View style={[styles.quickAddIcon, { backgroundColor: '#fce7f3' }]}>
                  <FontAwesome5 name="edit" size={16} color="#ec4899" />
                </View>
                <Text style={styles.quickAddLabel}>Текст</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAddButton}>
                <View style={[styles.quickAddIcon, { backgroundColor: '#d1fae5' }]}>
                  <FontAwesome5 name="camera" size={16} color="#10b981" />
                </View>
                <Text style={styles.quickAddLabel}>Фото</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAddButton}>
                <View style={[styles.quickAddIcon, { backgroundColor: '#dbeafe' }]}>
                  <FontAwesome5 name="chart-bar" size={16} color="#3b82f6" />
                </View>
                <Text style={styles.quickAddLabel}>Трекер</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Entries Section */}
        <View style={styles.entriesSection}>
          <View style={styles.entriesHeader}>
            <Text style={styles.entriesTitle}>Последние записи</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
                <Text style={[styles.filterButtonText, styles.filterButtonTextActive]}>Все</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Сегодня</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.entriesList}>
            {entries.map(renderEntry)}
          </View>

          <View style={styles.loadMoreContainer}>
            <TouchableOpacity style={styles.loadMoreButton}>
              <Text style={styles.loadMoreText}>Загрузить еще записи</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingAddButton}>
        <FontAwesome5 name="plus" size={24} color="#ffffff" />
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    backgroundColor: '#fdf2f8',
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
    gap: 12,
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
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
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
  quickAddSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  quickAddContainer: {
    backgroundColor: '#fbcfe8',
    borderRadius: 16,
    padding: 16,
  },
  quickAddTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
  },
  quickAddButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAddButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickAddIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddIconText: {
    fontSize: 16,
  },
  quickAddLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  entriesSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  entriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  entriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#fdf2f8',
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#ec4899',
    fontWeight: '500',
  },
  entriesList: {
    gap: 16,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fce7f3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  entryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIconText: {
    fontSize: 16,
  },
  entryTitleContainer: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  entryDateTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  entryImage: {
    width: '100%',
    height: 192,
    borderRadius: 12,
    marginBottom: 12,
  },
  statsContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsChange: {
    fontSize: 12,
    color: '#6b7280',
  },
  statsStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  entryContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 14,
  },
  actionCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  entryCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  loadMoreContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadMoreButton: {
    backgroundColor: '#fbcfe8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  bottomPadding: {
    height: 100,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 80,
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: '#ec4899',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingAddButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
