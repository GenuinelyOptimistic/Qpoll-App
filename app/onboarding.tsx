import React from 'react';
import { StyleSheet,Text, TouchableOpacity, View, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import { ButtonContainer, ButtonText, Center } from '@/constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';


const ONBOARDING_STEPS = [
  {
    id: 1,
    intro: true,
  },
  {
    id: 2,
    image: require('@/assets/images/StreetTalk.png'),
    subtitle: 'Built with React Native and Expo Router',
    action: 'Get Started',
  },
];

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

  const completeOnboarding = () => {
    router.replace('/(main)');
  };

  const pages = ONBOARDING_STEPS.map((step) => {
    const page: any = {
      backgroundColor: Colors[colorScheme].background,
      title: '',
      subtitle: (
        <View style={styles(colorScheme).container}>
          {step.intro && (
            <View>
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
            </View>
          )}

          {step.action && (
            <TouchableOpacity style={ButtonContainer} onPress={() => router.push('/invite-code')}>
              <Text style={ButtonText}>{step.action}</Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    };

    if (step.image) {
      page.image = (
        <View  style={{width: '100%', alignItems: 'center'}}>
          <Image source={step.image} style={{width: '100%', height: 200, resizeMode: 'contain', marginTop: 50, paddingHorizontal: 80}} />
          <Text style={[styles(colorScheme).subtitle, Center]}>Helping companies quickly crowdsource information to make smarter decisions.</Text>
        </View>
      );
    }

    return page;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
      <Onboarding
        pages={pages}
        onSkip={completeOnboarding}
        showDone={false}
        showNext={true}
        showSkip={true}
        titleStyles={styles(colorScheme).title}
        bottomBarHighlight={false}
        bottomBarHeight={80}
      />
    </SafeAreaView>
  );
}

const styles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  featureTitle: {
    fontSize: 206,
  },
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
