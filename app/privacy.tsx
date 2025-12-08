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

export default function PrivacyPolicyScreen() {
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.lastUpdated}>Last Updated: December 8, 2025</Text>

          <Text style={styles.intro}>
            This Privacy Policy describes how we collect, use, and protect your information when you use our polling application.
          </Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information that you provide directly to us, including:
          </Text>
          <Text style={styles.bulletPoint}>• Poll questions and answers you create</Text>
          <Text style={styles.bulletPoint}>• Your voting responses</Text>
          <Text style={styles.bulletPoint}>• Category preferences</Text>
          <Text style={styles.bulletPoint}>• Device information and usage data</Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect to:
          </Text>
          <Text style={styles.bulletPoint}>• Provide and maintain our service</Text>
          <Text style={styles.bulletPoint}>• Display polls relevant to your interests</Text>
          <Text style={styles.bulletPoint}>• Show aggregated voting results</Text>
          <Text style={styles.bulletPoint}>• Improve and personalize your experience</Text>
          <Text style={styles.bulletPoint}>• Detect and prevent abuse or violations</Text>

          <Text style={styles.sectionTitle}>3. Data Storage</Text>
          <Text style={styles.paragraph}>
            Your preferences and poll data are stored locally on your device using secure storage mechanisms. We do not transmit your personal data to external servers unless explicitly stated.
          </Text>

          <Text style={styles.sectionTitle}>4. Anonymous Voting</Text>
          <Text style={styles.paragraph}>
            Voting in polls is designed to be private. We do not link individual votes to personal identifiers. Poll results show only aggregated, anonymized data.
          </Text>

          <Text style={styles.sectionTitle}>5. Data Sharing</Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or rent your personal information to third parties. We may share aggregated, non-personally identifiable information publicly or with partners.
          </Text>

          <Text style={styles.sectionTitle}>6. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
          </Text>

          <Text style={styles.sectionTitle}>7. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to:
          </Text>
          <Text style={styles.bulletPoint}>• Access your data</Text>
          <Text style={styles.bulletPoint}>• Delete your content and preferences</Text>
          <Text style={styles.bulletPoint}>• Opt out of data collection</Text>
          <Text style={styles.bulletPoint}>• Request information about your data</Text>

          <Text style={styles.sectionTitle}>8. Children&apos;s Privacy</Text>
          <Text style={styles.paragraph}>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </Text>

          <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </Text>

          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy, please contact us through the app&apos;s support section.
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
    marginBottom: 20,
    textAlign: 'center',
  },
  intro: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 24,
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
