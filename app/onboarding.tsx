import React from 'react';
import { StyleSheet,Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Stack, useRouter } from 'expo-router';

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Qpoll',
    description: 'Get answers to your questions quickly through crowd-sourced polling.',
    icon: '📊',
  },
  {
    id: 2,
    title: 'Earn Money',
    description: 'Get paid for your opinions by participating in polls.',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Make Informed Decisions',
    description: 'Use community wisdom to make better choices in your daily life.',
    icon: '💡',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();

  const completeOnboarding = () => {
    router.replace('/(main)');
  };

  const pages = onboardingSteps.map((step) => ({
    backgroundColor: '#ffffff',
    image: (
      <Text style={styles.icon}>{step.icon}</Text>
    ),
    title: (
      <Text style={styles.title}>{step.title}</Text>
    ),
    subtitle: (
      <Text style={styles.description}>{step.description}</Text>
    ),
  }));

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Onboarding
        pages={pages}
        onDone={completeOnboarding}
        onSkip={completeOnboarding}
        showNext={true}
        showSkip={true}
        titleStyles={styles.title}
        subTitleStyles={styles.description}
        bottomBarHighlight={false}
        bottomBarHeight={80}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 80,
    borderBlockColor: '#000',
    borderWidth: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
});
