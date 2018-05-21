/* eslint-disable import/default */
import Expo from 'expo'
import firebase from 'firebase'
// required for side-effects
require('firebase/firestore')
import {App} from './src/components/App'
import {firebaseConfig} from './src/constants/firebase'

firebase.initializeApp(firebaseConfig)

firebase.firestore().settings({timestampsInSnapshots: true})

// Firestore sets a really long timeout (30k ms) for some reason
// This causes a warning that we can safely ignore
// eslint-disable-next-line no-console
console.ignoredYellowBox = ['Setting a timer']

Expo.registerRootComponent(App)
