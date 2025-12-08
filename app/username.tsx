import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

export default function UsernameScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const suggestions = useMemo(() => {
    if (!username) return [];
    
    const baseSuggestions = [
      `${username}2`,
      `${username}3`,
      `${username}4`,
      `${username}_official`,
      `${username}_real`,
      `the_${username}`,
    ];
    
    return baseSuggestions.slice(0, 3);
  }, [username]);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setIsValid(text.length >= 3);
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/polls');
  };

  const handleSignUp = () => {
    if (!isValid) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Username created:', username);
    router.push('/polls');
  };

  const handleSuggestionPress = (suggestion: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setUsername(suggestion);
    setIsValid(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.main}>
            <Text style={styles.title}>Create username</Text>
            <Text style={styles.subtitle}>You can always change this later.</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />
              {isValid && (
                <View style={styles.checkmark}>
                  <Check size={24} color="#4CD964" strokeWidth={3} />
                </View>
              )}
            </View>

            {suggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsLabel}>Suggested</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.suggestionsScroll}
                >
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionChip}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.signUpButton,
              !isValid && styles.signUpButtonDisabled,
            ]}
            onPress={handleSignUp}
            activeOpacity={0.8}
            disabled={!isValid}
          >
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  skipButton: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
    marginBottom: 60,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#1a1a1a',
    paddingVertical: 8,
  },
  checkmark: {
    marginLeft: 12,
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
    marginBottom: 16,
  },
  suggestionsScroll: {
    gap: 12,
  },
  suggestionChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 16,
  },
  signUpButton: {
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
  signUpButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  signUpButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
