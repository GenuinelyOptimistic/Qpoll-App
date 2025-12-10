import React from 'react';
import { StyleSheet,Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { ThemedText } from '@/components/themed-text';


import { Colors } from '@/constants/theme';
import { globalStyles } from "./constants/global";

export default function IntroScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  return (
      <View style={[globalStyles.content, { marginTop: 60 }]}>
        <View  style={{width: '100%', alignItems: 'center'}}>
          <Image source={require("../assets/images/StreetTalk.png")} style={{width: '100%', height: 200, resizeMode: 'contain', marginTop: 50, paddingHorizontal: 80}} />
          <Text style={[styles(colorScheme).subtitle, globalStyles.center]}>Helping companies quickly crowdsource information to make smarter decisions.</Text>
        </View>
        <TouchableOpacity style={globalStyles.buttonContainer} onPress={() => router.push('/onboarding')}>
          <ThemedText style={globalStyles.buttonText}>Get Started</ThemedText>
        </TouchableOpacity>
      </View>
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
    color: colorScheme === 'dark' ? '#2a2a2a' : '#A8ABAF',
  },
  featuresList: {
    gap: 12,
    marginTop: 30,
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
    color: colorScheme === 'dark' ? '#2a2a2a' : '#777671',
    lineHeight: 21,
  },
});
