import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCvvcghFoG37MKM1RMlZdE9aN5vmoQ-pys',
  authDomain: 'valibo-84ec1.firebaseapp.com',
  databaseURL: 'https://valibo-84ec1.firebaseio.com',
  projectId: 'valibo-84ec1',
  storageBucket: 'valibo-84ec1.appspot.com',
  messagingSenderId: '885320235025',
  appId: '1:885320235025:web:5ce7cd1098c0b0592bd9b0',
  measurementId: 'G-ZFCQEBRD6C',
})

export const db = firebaseApp.firestore()
