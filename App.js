// import React, {useEffect, useState} from 'react';
// import {Button, Text, View} from 'react-native';

import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  CategoryScreen,
  CreatePollScreen,
  PollListScreen,
} from './src/screens'

const Stack = createStackNavigator()

class App extends React.Component {
  render() {
    return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthLoadingScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="CreatePollScreen" component={CreatePollScreen} />
            <Stack.Screen name="PollListScreen" component={PollListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
