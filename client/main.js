/* eslint-disable import/default */
import Expo from 'expo';
import firebase from 'firebase';
// required for side-effects
require('firebase/firestore');
import {App} from './src/components/App';
import {firebaseConfig} from './src/constants/firebase';

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({timestampsInSnapshots: true});

Expo.registerRootComponent(App);
