import React, { useState, useEffect } from 'react'
import { getCategory } from '../api/firestore-api'
import { StyleSheet, Text, View } from 'react-native'
import Background from '../components/Background'
import Paragraph from '../components/Paragraph'

import Logo from '../components/Logo'
import Header from '../components/Header'
import Toast from '../components/Toast'

export default function CategoryScreen({ navigation }) {
  const [categies, setCategory] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await getCategory()
      setCategory(response)
      if (response.error) {
        setError(response.error)
      }
    }

    fetchData()
    setLoading(false)
  }, [])

  return (
    <Background>
      <Logo />
      <Header>Categories</Header>
      <Paragraph>Select what types of polls you are interested in below.</Paragraph>
      <View style={styles.catagories}>
        {categies.map((category) => {
          return <Text style={styles.item}>{category.name}</Text>
        })}
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}

const styles = StyleSheet.create({
  catagories: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 15,
  },
})
