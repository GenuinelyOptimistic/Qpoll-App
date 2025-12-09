import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CategoryProvider } from './context/CategoryContext';
import { AuthContextProvider } from './context/auth';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CategoryProvider>
        <AuthContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="interest" options={{ headerShown: false }} />
            <Stack.Screen name="poll" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="username" options={{ headerShown: false }} />
            <Stack.Screen name="profile-photo" options={{ headerShown: false }} />
            <Stack.Screen name="invite-code" options={{ headerShown: false }} />
            <Stack.Screen name="phone-number" options={{ headerShown: false }} />
            <Stack.Screen name="pending" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </AuthContextProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
}
