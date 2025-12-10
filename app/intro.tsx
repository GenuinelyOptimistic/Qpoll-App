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
      <View style={[globalStyles.content, { backgroundColor: Colors[colorScheme].background, justifyContent: 'flex-start' }]}>
        <View  style={{paddingHorizontal: 24, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Image source={colorScheme === 'light' ? require("../assets/images/StreetTalk-dark.png") : require("../assets/images/StreetTalk-light.png")} style={{width: '80%', height: undefined, aspectRatio: 6/1, resizeMode: 'contain', alignSelf: 'center', overflow: 'hidden', marginBottom: 12}} />
          <Text style={[styles(colorScheme).subtitle, globalStyles.center, { color: Colors[colorScheme].text, fontSize: 12 }]}>Helping companies quickly crowdsource information to make smarter decisions.</Text>
        </View>
        <TouchableOpacity style={[globalStyles.buttonContainer, { marginBottom: 64 }]} onPress={() => router.push('/onboarding')}>
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
