import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import Header from '../components/Header'
import Toast from '../components/Toast'
import { Button } from 'react-native-paper'
import { createPoll } from '../api/firestore-api'
import { theme } from '../core/theme'
import { PieChart } from 'react-native-gifted-charts'
import SegmentedPicker from 'react-native-segmented-picker'
import RNShake from 'react-native-shake'

export default function CreatePollScreen({ navigation }) {
  const [question, setQuestion] = React.useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  //TO DO: add char count for each input
  const [charCount, setCharCount] = useState()
  const segmentedPicker = React.createRef()
  const [pollChoices, setPollChoices] = useState([])

  const data = [
    { value: 200 - question.length, color: '#E1E3E5' },
    { value: question.length, color: '#4384CF' },
  ]

  useEffect(() => {
    setLoading(false)
    setPollChoices(['', ''])
    setCharCount(0)
    // TO DO: Reset form on shake
    // const subscription = RNShake.addListener(() => {
    //   Alert.alert(
    //     "Alert Title",
    //     "My Alert Msg",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ]
    //   )
    // })
    // return () => {
    //   // Your code here...
    //   subscription.remove()
    // }
  }, [])

  const openDateRangePicker = () => {
    segmentedPicker.current.show()
  }

  const savePoll = async () => {
    setLoading(true)

    await createPoll(question, pollChoices)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

    resetPoll()
    setLoading(false)
    navigation.navigate('PollList')
  }

  const resetPoll = () => {
    setPollChoices(['', ''])
    setQuestion('')
  }

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    const response = await loginUser({
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
  }

  const charLimitIndicator = (input, limit) => {
    let percent = (input.length / limit) * 100
    if (percent >= 40 && percent < 80) {
      return theme.focus
    }
    if (percent >= 80 && percent < 90) {
      return theme.warning
    }
    if (percent >= 90) {
      return theme.danger
    }
  }
  const onConfirm = (selections) => {
    console.info(selections)
  }

  const addChoice = () => {
    const choice = ''
    // pollChoices
    setPollChoices((prev) => [...prev, choice])
  }

  const removeChoice = (choice) => {
    const newChoices = pollChoices.filter((p) => p !== choice)
    setPollChoices(newChoices)
  }

  const handleChange = (value, index) => {
    const newChoices = [...pollChoices]
    newChoices[index] = value
    setPollChoices(newChoices)
  }

  return (
    <SafeAreaView style={theme.container}>
      <ScrollView>
        <View style={theme.content}>
          <Header>Create Poll</Header>
          <Text style={styles.text}>Select what types of polls you are interested in below.</Text>

          <TextInput
            style={styles.questionInput}
            placeholder="Ask a question..."
            value={question}
            onChangeText={(question) => setQuestion(question)}
            placeholderTextColor="#CCCCCC"
            multiline={true}
            maxLength={200}
          />

          <Text style={[theme.pullRight, theme.mb, styles.charLimit, charLimitIndicator(question, 200)]}>{200 - question.length}</Text>
          {/* TODO: Add emojis when limit changes for a more fun playful experience */}
          <View style={styles.choices}>
            <View style={styles.choicesLimitIndicator}>
              <PieChart donut data={data} innerRadius={4} radius={6} />
            </View>

            {pollChoices.length > 0 &&
              pollChoices.map((choice, index) => {
                return (
                  <View>
                    <TextInput
                      key={`pollChoice_${index}`}
                      style={styles.choice}
                      placeholder={`Choice ${index + 1}`}
                      value={choice}
                      onChangeText={(value) => handleChange(value, index)}
                      placeholderTextColor="#C2D0DF"
                      multiline={true}
                      maxLength={80}
                    />
                    {
                      // TO DO: add remove button
                      /* <TouchableOpacity onPress={(value) => removeChoice(value)}>
                      <Text>- remove</Text>
                    </TouchableOpacity> */
                    }
                  </View>
                )
              })}

            {(() => {
              if (pollChoices.length <= 3) {
                return (
                  //TO DO: PULL TO RIGT
                  <TouchableOpacity style={styles.addChoice} onPress={addChoice}>
                    <Text>+ add choice</Text>
                  </TouchableOpacity>
                )
              }
            })()}

            <View style={styles.pollLength}>
              <Text style={styles.bold}>Poll Length</Text>
              <TouchableOpacity onPress={openDateRangePicker}>
                <Text style={styles.time}>{1 + ' day'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button loading={loading} mode="contained" onPress={savePoll}>
            Create Poll
          </Button>
          <Toast message={error} onDismiss={() => setError('')} />

          {/* TO DO: Add time picker */}
          <View style={{ height: 20 }}>
            <SegmentedPicker
              ref={segmentedPicker}
              onConfirm={onConfirm}
              options={[
                {
                  key: 'days',
                  items: [{ label: 'days', value: '' }],
                },
                {
                  key: 'hours',
                  items: [{ label: 'hours', value: '' }],
                },

                {
                  key: 'mins',
                  items: [{ label: 'mins', value: '' }],
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  questionInput: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    maxHight: 170,
    minHeight: 100,
    lineHeight: 27,
    color: '#191B1F',
  },
  choice: {
    marginBottom: 20,
    borderColor: '#4384CF',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 6,
    // paddingTop: Platform.OS === 'ios' ? 12 : 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    lineHeight: 20,
  },
  charLimit: {
    fontSize: 12,
    color: '#a8afba',
  },
  choices: {
    borderColor: '#C2D0DF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
    marginBottom: 30,
    marginTop: 15,
  },
  addChoice: {
    marginBottom: 20,
    textAlign: 'right',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 10,
    color: '#4B4E53',
  },
  pollLength: {
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    flex: 1,
  },
  time: {
    color: '#555',
    flex: 1,
    textAlign: 'right',
  },
  choicesLimitIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
})
