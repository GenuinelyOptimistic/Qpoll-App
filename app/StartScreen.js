import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>
      <Paragraph>Start asking questions. Start getting answers.</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Log In
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  )
}
