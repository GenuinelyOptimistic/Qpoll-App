import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

export const getCategory = async () => {
  try {
    const category = await firestore().collection('categories').get()
    return category.docs.map((doc) => doc.data())
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const getPolls = async () => {
  try {
    const polls = await firestore().collection('polls').get()
    return polls.docs.map((doc) => doc.data())
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const createPoll = async (question, choices) => {
  const today = moment().format()
  const endDate = moment().add(1, 'd').format()
  // const endDate = moment().add(pollLength.days, 'd').add(pollLength.hrs, 'h').add(pollLength.mins, 'm').format()

  await firestore()
    .collection('polls')
    .add({
      question: question,
      createDate: today,
      endDate: endDate,
    })
    .then((docRef) => {
      addChoice(choices, docRef.id)
      return docRef.id
    })
    .catch((error) => {
      return error.message
    })
}

export const addChoice = async (choices, documentId) => {
  const today = moment().format()

  for (i = 0; i <= choices.length; i++) {
    // const endDate = moment().add(pollLength.days, 'd').add(pollLength.hrs, 'h').add(pollLength.mins, 'm').format()
    await firestore()
      .collection('choices')
      .add({
        choice: choices[i],
        poll: firestore().collection('polls').doc(documentId),
        // poll: firestore.FieldValue.arrayUnion(docRef),
        createDate: firestore.Timestamp.now(),
      })
      .then((docRef) => {
        return docRef.id
      })
      .catch((error) => {
        return error.message
      })
  }
}
