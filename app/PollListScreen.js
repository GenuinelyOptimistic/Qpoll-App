import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import Toast from '../components/Toast'
import { getPolls } from '../api/firestore-api'
import { theme } from '../core/theme'

export default function PollListScreen({ navigation }) {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await getPolls()
      setPolls(response)
      if (response.error) {
        setError(response.error)
      }
    }

    fetchData()
    setLoading(false)
  }, [])

  return (
    <SafeAreaView style={theme.container}>
      <ScrollView>
        <View style={[theme.content, styles.column]}>
            {polls.map((poll) => {
              return (
                <TouchableOpacity style={styles.item}>
                  <Text>{poll.question}</Text>
                </TouchableOpacity>
              )           
            })}
          <Toast message={error} onDismiss={() => setError('')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
    borderColor: '#000000',
    color: '#ffffff',
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
})
