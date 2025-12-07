import React from 'react'
import { ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'

import Background from '../components/Background'
import { theme } from '../core/theme'

export default function AuthLoadingScreen({ navigation }) {
  auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.reset({
        index: 0,
        routes: [{ name: 'PollListScreen' }],
      })
    } else {
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }
  })

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  )
}
