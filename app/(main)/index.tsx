import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Content, TextContent, Paragraph, Italic, ButtonContainer,ButtonText, LinkText, Center } from '@/constants/styles';


export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={{ flex: 1 , backgroundColor: '#fff'}} contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={Content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={TextContent}>
          <ThemedText style={Paragraph}>Hey, welcome to StreetTalk we're happy to have you here. We at StreetTalk would like to do things a bit different and skip the registration process. Plus the idea is to get you, the answers to your questions quickly.</ThemedText> 
          <ThemedText style={Paragraph}>We've been working hard to get StreetTalk ready for launch and we think it's <ThemedText style={Italic}>almosttttt there</ThemedText>. While we try not to overthink things too much and at the same wrap on our "must haves" we've decided to invite people gradually.</ThemedText>
          <ThemedText style={Paragraph}>While you don't need to register right away we think creating a username helps the app feel a little more personal. So if you don't yet have aa usename feel free to reserve yours now and if you don't yet have and invite we'll get you one very soon. We are so grateful you're here and can't wait to have you join! </ThemedText>
          {/* <ThemedText style={Paragraph}>Denzil, Chinaka & the StreetTalk team</ThemedText> */}
          <TouchableOpacity style={ButtonContainer} onPress={() => router.push('/phone-number')}>
            <ThemedText style={ButtonText}>Reserve my account</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/invite-code')}>
            <ThemedText style={[LinkText,Center]}>Already have an invite, start asking questions.</ThemedText>
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
