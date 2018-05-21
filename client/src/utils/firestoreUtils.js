import {uidSelector} from '../selectors/firebaseSelectors'
import firebase from 'firebase'

export const getUserRef = () =>
  firebase
    .firestore()
    .collection('users')
    .doc(uidSelector(firebase))

export const getExercisesRef = () => getUserRef().collection('exercises')

export const getWorkoutRef = () => getUserRef().collection('workouts')
