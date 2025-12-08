import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, GripVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface PollOption {
  id: string;
  text: string;
}

export default function CreatePollScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleRemoveOption = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const optionsWithContent = options.filter(opt => opt.text.trim() !== '');
    const optionIndex = options.findIndex(opt => opt.id === id);
    const currentOption = options[optionIndex];

    if (optionsWithContent.length <= 2) {
      const updatedOptions = options.map(opt => 
        opt.id === id ? { ...opt, text: '' } : opt
      );
      setOptions(updatedOptions);
    } else {
      if (currentOption.text.trim() === '') {
        const updatedOptions = options.filter(opt => opt.id !== id);
        setOptions(updatedOptions);
      } else {
        const updatedOptions = options.filter(opt => opt.id !== id);
        setOptions(updatedOptions);
      }
    }
  };

  const handleAddOption = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newOption: PollOption = {
      id: Date.now().toString(),
      text: '',
    };
    setOptions([...options, newOption]);
  };

  const handleUpdateOption = (id: string, text: string) => {
    const updatedOptions = options.map(opt =>
      opt.id === id ? { ...opt, text } : opt
    );
    setOptions(updatedOptions);
  };

  const handlePost = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    const validOptions = options.filter(opt => opt.text.trim() !== '');
    if (validOptions.length < 2) {
      Alert.alert('Error', 'Please add at least 2 options');
      return;
    }

    console.log('Creating poll:', {
      question,
      options: validOptions,
    });

    Alert.alert('Success', 'Poll created!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <X size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create a Poll</Text>
        <View style={styles.headerRight} />
      </SafeAreaView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.label}>Ask a Question*</Text>
          <TextInput
            style={styles.questionInput}
            placeholder="Type Here..."
            placeholderTextColor="#ccc"
            value={question}
            onChangeText={setQuestion}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Poll Options</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <View key={option.id} style={styles.optionRow}>
                <View style={styles.dragHandle}>
                  <GripVertical size={20} color="#999" />
                </View>
                <TextInput
                  style={styles.optionInput}
                  placeholder={`Option ${index + 1}`}
                  placeholderTextColor="#ccc"
                  value={option.text}
                  onChangeText={(text) => handleUpdateOption(option.id, text)}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveOption(option.id)}
                  activeOpacity={0.7}
                >
                  <X size={20} color="#999" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddOption}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+ Add Another Option</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  questionInput: {
    fontSize: 16,
    color: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 0,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  dragHandle: {
    paddingVertical: 12,
  },
  optionInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    paddingVertical: 12,
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5B93FF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postButton: {
    backgroundColor: '#5B93FF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#5B93FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  postButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
