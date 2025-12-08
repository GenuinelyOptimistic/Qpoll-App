import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Content } from '@/constants/theme';

const categories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Sports' },
  { id: '3', name: 'Entertainment' },
  { id: '4', name: 'Politics' },
  { id: '5', name: 'Science' },
  { id: '6', name: 'Health' },
  { id: '7', name: 'Education' },
  { id: '8', name: 'Business' },
  { id: '9', name: 'Travel' },
  { id: '10', name: 'Food' },
];

export default function InterestScreen() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const toggleInterest = (categoryId: string) => {
    setSelectedInterests(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  return (
    <ThemedView style={Content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Categories!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.description}>
          Select what types of polls you are interested in below
        </ThemedText>
        <ScrollView style={styles.categoriesContainer}>
          <View style={styles.categories}>
            {categories.map((category) => {
              const isSelected = selectedInterests.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => toggleInterest(category.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <View style={styles.checkmark} />}
                  </View>
                  <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {selectedInterests.length > 0 && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.push('/poll')}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.continueButtonText}>
              Start Polling
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    flex: 1,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: '45%',
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#666',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
