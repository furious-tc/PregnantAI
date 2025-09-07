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
  Alert
} from 'react-native';

interface JournalEntry {
  id: string;
  date: Date;
  text?: string;
  mood?: 'great' | 'good' | 'neutral' | 'sad';
  weight?: number;
  symptoms: string[];
  photos?: string[];
}

const moodOptions = [
  { id: 'great', emoji: '😊', label: 'Отлично', color: '#10b981' },
  { id: 'good', emoji: '😌', label: 'Хорошо', color: '#3b82f6' },
  { id: 'neutral', emoji: '😐', label: 'Нормально', color: '#f59e0b' },
  { id: 'sad', emoji: '😔', label: 'Грустно', color: '#ef4444' },
];

const commonSymptoms = [
  'Тошнота', 'Усталость', 'Головная боль', 'Изжога', 
  'Отеки', 'Боль в спине', 'Запор', 'Головокружение',
  'Бессонница', 'Судороги', 'Варикоз', 'Одышка'
];

export const JournalScreen: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(2024, 8, 6),
      text: 'Сегодня чувствую себя замечательно! Малыш активно шевелится, особенно после завтрака. Прошла пренатальную йогу - очень расслабляет.',
      mood: 'great',
      weight: 68.5,
      symptoms: ['Легкая усталость'],
    },
    {
      id: '2', 
      date: new Date(2024, 8, 5),
      text: 'Немного болела голова с утра, но после прогулки стало лучше. Врач сказал, что все показатели в норме.',
      mood: 'good',
      weight: 68.3,
      symptoms: ['Головная боль'],
    }
  ]);
  
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    text: '',
    mood: undefined,
    weight: undefined,
    symptoms: [],
  });

  const handleSaveEntry = () => {
    if (!newEntry.text?.trim() && !newEntry.mood && !newEntry.weight && newEntry.symptoms?.length === 0) {
      Alert.alert('Ошибка', 'Добавьте хотя бы одну информацию в запись');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      text: newEntry.text || '',
      mood: newEntry.mood,
      weight: newEntry.weight,
      symptoms: newEntry.symptoms || [],
    };

    setEntries([entry, ...entries]);
    setNewEntry({ text: '', mood: undefined, weight: undefined, symptoms: [] });
    setShowNewEntryModal(false);
  };

  const toggleSymptom = (symptom: string) => {
    const symptoms = newEntry.symptoms || [];
    if (symptoms.includes(symptom)) {
      setNewEntry({
        ...newEntry,
        symptoms: symptoms.filter(s => s !== symptom)
      });
    } else {
      setNewEntry({
        ...newEntry,
        symptoms: [...symptoms, symptom]
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      if (entry.mood) {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);
    return { moodCounts, total };
  };

  const getAverageWeight = () => {
    const weights = entries.filter(e => e.weight).map(e => e.weight!);
    if (weights.length === 0) return 0;
    return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
  };

  const renderEntry = (entry: JournalEntry) => {
    const mood = moodOptions.find(m => m.id === entry.mood);
    
    return (
      <View key={entry.id} style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
          {mood && (
            <View style={[styles.moodBadge, { backgroundColor: mood.color }]}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </View>
          )}
        </View>

        {entry.text && (
          <Text style={styles.entryText}>{entry.text}</Text>
        )}

        <View style={styles.entryMetrics}>
          {entry.weight && (
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Вес:</Text>
              <Text style={styles.metricValue}>{entry.weight} кг</Text>
            </View>
          )}

          {entry.symptoms.length > 0 && (
            <View style={styles.symptomsContainer}>
              <Text style={styles.symptomsLabel}>Симптомы:</Text>
              <View style={styles.symptomsChips}>
                {entry.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomChip}>
                    <Text style={styles.symptomChipText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const { moodCounts, total } = getMoodStats();
  const averageWeight = getAverageWeight();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Дневник беременности</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowNewEntryModal(true)}
        >
          <Text style={styles.addButtonText}>+ Запись</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Статистика</Text>
          
          <View style={styles.statsCards}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{entries.length}</Text>
              <Text style={styles.statLabel}>записей</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{averageWeight.toFixed(1)}</Text>
              <Text style={styles.statLabel}>средний вес</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {total > 0 ? Math.round((moodCounts.great || 0) / total * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>хорошее настроение</Text>
            </View>
          </View>
        </View>

        {/* Mood Chart */}
        {total > 0 && (
          <View style={styles.moodChart}>
            <Text style={styles.chartTitle}>Настроение за последнее время</Text>
            <View style={styles.moodBars}>
              {moodOptions.map(mood => {
                const count = moodCounts[mood.id] || 0;
                const percentage = total > 0 ? (count / total) * 100 : 0;
                
                return (
                  <View key={mood.id} style={styles.moodBar}>
                    <View style={styles.moodBarInfo}>
                      <Text style={styles.moodBarEmoji}>{mood.emoji}</Text>
                      <Text style={styles.moodBarLabel}>{mood.label}</Text>
                    </View>
                    <View style={styles.moodBarTrack}>
                      <View 
                        style={[
                          styles.moodBarFill, 
                          { width: `${percentage}%`, backgroundColor: mood.color }
                        ]} 
                      />
                    </View>
                    <Text style={styles.moodBarCount}>{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Entries List */}
        <View style={styles.entriesSection}>
          <Text style={styles.entriesTitle}>Записи</Text>
          {entries.length > 0 ? (
            entries.map(renderEntry)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>📝</Text>
              <Text style={styles.emptyStateTitle}>Пока нет записей</Text>
              <Text style={styles.emptyStateText}>
                Создайте первую запись, чтобы начать отслеживать свое самочувствие
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* New Entry Modal */}
      <Modal
        visible={showNewEntryModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowNewEntryModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowNewEntryModal(false)}>
              <Text style={styles.modalCancelButton}>Отмена</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Новая запись</Text>
            <TouchableOpacity onPress={handleSaveEntry}>
              <Text style={styles.modalSaveButton}>Сохранить</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Text Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Как дела? Что чувствуешь?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Расскажи о своем дне, ощущениях, мыслях..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                value={newEntry.text}
                onChangeText={(text) => setNewEntry({ ...newEntry, text })}
              />
            </View>

            {/* Mood Selector */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Настроение</Text>
              <View style={styles.moodSelector}>
                {moodOptions.map(mood => (
                  <TouchableOpacity
                    key={mood.id}
                    style={[
                      styles.moodOption,
                      newEntry.mood === mood.id && styles.selectedMoodOption
                    ]}
                    onPress={() => setNewEntry({ ...newEntry, mood: mood.id as any })}
                  >
                    <Text style={styles.moodOptionEmoji}>{mood.emoji}</Text>
                    <Text style={styles.moodOptionLabel}>{mood.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Weight Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Вес (кг)</Text>
              <TextInput
                style={styles.weightInput}
                placeholder="68.5"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                value={newEntry.weight?.toString() || ''}
                onChangeText={(text) => {
                  const weight = parseFloat(text);
                  setNewEntry({ ...newEntry, weight: isNaN(weight) ? undefined : weight });
                }}
              />
            </View>

            {/* Symptoms Selector */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Симптомы (выберите подходящие)</Text>
              <View style={styles.symptomsSelector}>
                {commonSymptoms.map(symptom => (
                  <TouchableOpacity
                    key={symptom}
                    style={[
                      styles.symptomSelector,
                      (newEntry.symptoms || []).includes(symptom) && styles.selectedSymptom
                    ]}
                    onPress={() => toggleSymptom(symptom)}
                  >
                    <Text style={[
                      styles.symptomSelectorText,
                      (newEntry.symptoms || []).includes(symptom) && styles.selectedSymptomText
                    ]}>
                      {symptom}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsCards: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f0fdfa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  moodChart: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  moodBars: {
    gap: 12,
  },
  moodBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moodBarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  moodBarEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  moodBarLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  moodBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  moodBarFill: {
    height: 8,
    borderRadius: 4,
  },
  moodBarCount: {
    fontSize: 12,
    color: '#6b7280',
    width: 20,
    textAlign: 'right',
  },
  entriesSection: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  entriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  entryCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moodEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  entryText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryMetrics: {
    gap: 8,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  metricValue: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  symptomsContainer: {
    gap: 8,
  },
  symptomsLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  symptomsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  symptomChip: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  symptomChipText: {
    fontSize: 10,
    color: '#dc2626',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalCancelButton: {
    fontSize: 16,
    color: '#6b7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalSaveButton: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1f2937',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  moodSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  moodOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selectedMoodOption: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  moodOptionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodOptionLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  weightInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  symptomsSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomSelector: {
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedSymptom: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  symptomSelectorText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedSymptomText: {
    color: '#dc2626',
  },
});
