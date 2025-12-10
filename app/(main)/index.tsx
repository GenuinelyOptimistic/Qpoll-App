import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { globalStyles } from "../constants/global";

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={{ flex: 1 , backgroundColor: '#fff'}} contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={globalStyles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={globalStyles.textContent}>
          <ThemedText style={globalStyles.paragraph}>Hey, welcome to StreetTalk we're happy to have you here. We at StreetTalk would like to do things a bit different and skip the registration process. Plus the idea is to get you, the answers to your questions quickly.</ThemedText> 
          <ThemedText style={globalStyles.paragraph}>We've been working hard to get StreetTalk ready for launch and we think it's <ThemedText style={globalStyles.italic}>almosttttt there</ThemedText>. While we try not to overthink things too much and at the same wrap on our "must haves" we've decided to invite people gradually.</ThemedText>
          <ThemedText style={globalStyles.paragraph}>While you don't need to register right away we think creating a username helps the app feel a little more personal. So if you don't yet have aa usename feel free to reserve yours now and if you don't yet have and invite we'll get you one very soon. We are so grateful you're here and can't wait to have you join! </ThemedText>
          {/* <ThemedText style={globalStyles.paragraph}>Denzil, Chinaka & the StreetTalk team</ThemedText> */}
          <TouchableOpacity style={globalStyles.buttonContainer} onPress={() => router.push('/phone-number')}>
            <ThemedText style={globalStyles.buttonText}>Reserve my account</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/invite-code')}>
            <ThemedText style={[globalStyles.linkText, globalStyles.center]}>Already have an invite, start asking questions.</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
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

});
