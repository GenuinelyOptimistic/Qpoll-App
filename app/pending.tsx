import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { globalStyles } from "./constants/global";


export default function PendingScreen() {
  const router = useRouter();

  return (
    <View style={[globalStyles.content, {paddingHorizontal:60}]}>
        <View style={[styles.successCircle, {alignSelf: 'center'}]}>
            <Check size={48} color="#fff" strokeWidth={3} />
        </View>
        <Text style={styles.successTitle}>🥳 Perfect! We have reserved your spot! </Text>
        <Text style={[styles.successSubtitle, globalStyles.center]}>We'll text you as soon as your account is ready.</Text>
        <TouchableOpacity onPress={() => router.push('/poll')}>
            <ThemedText style={[globalStyles.linkText, globalStyles.center]}>Start answering questions</ThemedText>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#4CD964',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
  },
});
