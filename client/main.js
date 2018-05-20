/* eslint-disable import/default */
import Expo from 'expo';
import firebase from 'firebase';
import {App} from './src/components/App';
import {firebaseConfig} from './src/constants/firebase';

firebase.initializeApp(firebaseConfig);

Expo.registerRootComponent(App);
