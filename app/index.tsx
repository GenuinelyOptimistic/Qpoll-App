import { Redirect } from 'expo-router';

export default function Index() {
  // Always redirect to onboarding on initial load
  return <Redirect href="/onboarding" />;
}
