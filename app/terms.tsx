import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ChevronLeft size={28} color="#1a1a1a" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms of Service</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.lastUpdated}>Last Updated: December 8, 2025</Text>

          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing and using this polling application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this service.
          </Text>

          <Text style={styles.sectionTitle}>2. Use of Service</Text>
          <Text style={styles.paragraph}>
            You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the service.
          </Text>

          <Text style={styles.sectionTitle}>3. User Content</Text>
          <Text style={styles.paragraph}>
            Users are responsible for the polls they create and the content they post. We reserve the right to remove any content that violates these terms or is deemed inappropriate.
          </Text>

          <Text style={styles.sectionTitle}>4. Prohibited Content</Text>
          <Text style={styles.paragraph}>
            You may not create or share polls that contain:
          </Text>
          <Text style={styles.bulletPoint}>• Hate speech or discriminatory content</Text>
          <Text style={styles.bulletPoint}>• Harassment or bullying</Text>
          <Text style={styles.bulletPoint}>• Spam or misleading information</Text>
          <Text style={styles.bulletPoint}>• Illegal content or activities</Text>
          <Text style={styles.bulletPoint}>• Explicit or inappropriate material</Text>

          <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
          </Text>

          <Text style={styles.sectionTitle}>6. Account Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Text>

          <Text style={styles.sectionTitle}>7. Disclaimer</Text>
          <Text style={styles.paragraph}>
            Your use of the service is at your sole risk. The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind.
          </Text>

          <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </Text>

          <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.
          </Text>

          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us through the app&apos;s support section.
          </Text>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  lastUpdated: {
    fontSize: 13,
    fontWeight: '500',
    color: '#999',
    marginBottom: 32,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 16,
  },
  bottomSpacer: {
    height: 40,
  },
});
