import React from 'react';
import { StyleSheet,Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Colors } from '@/constants/theme';
import { globalStyles } from "./constants/global";

const FEATURES = [
  {
    id: '1',
    emoji: '📊',
    title: 'Find Information',
    description: 'Get answers to your questions quickly through crowd-sourced polling.',
  },
  {
    id: '2',
    emoji: '💰',
    title: 'Earn Money',
    description: 'Get paid for your opinions by participating in polls',
  },
  {
    id: '3',
    emoji: '🚀',
    title: 'Make Informed Decisions',
    description: 'Use community wisdom to make better choices in your daily life.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={{ flex: 1 , backgroundColor: Colors[colorScheme].background}}>
      <View style={[globalStyles.content, { marginTop: 60 }]}>
        <View style={styles(colorScheme).featuresList}>
          {FEATURES.map((feature) => (
            <View key={feature.id} style={styles(colorScheme).featureCard}>
              <View style={styles(colorScheme).iconContainer}>
                <Text style={styles(colorScheme).emoji}>{feature.emoji}</Text>
              </View>
              <View style={styles(colorScheme).textContainer}>
                <Text style={styles(colorScheme).featureTitle}>{feature.title}</Text>
                <Text style={styles(colorScheme).featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={globalStyles.buttonContainer} onPress={() => router.push('/(main)')}>
          <Text style={globalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors[colorScheme].text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#2A2A2A' : '#A8ABAF',
  },
  featuresList: {
    gap: 12,
    marginTop: 100,
  },
  featureCard: {
    backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#F0F5FA',
    borderRadius: 16,
    padding: 16,
  },
  featureLeft: {
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  emoji: {
    fontSize: 30,
  },
  textContainer: {
    marginTop: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme].text,
  },
  featureDescription: {
    fontSize: 14,
    marginTop: 2,
    color: colorScheme === 'dark' ? '#717477' : '#2A2A2A',
    lineHeight: 21,
  },
});
