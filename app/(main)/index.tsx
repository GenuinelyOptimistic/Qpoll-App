import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Content } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={Content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Hey, who every you are! Qpoll is not like most apps you would come accross. That’s why we won’t force you to signup for our service before you are ready to do so yourself. Plus the ideas is to get you the answers to your questions quickly.</ThemedText>
        <ThemedText>So go ahead and explore the app. When you are ready to sign up, we will be here to welcome you with open arms.</ThemedText>
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
