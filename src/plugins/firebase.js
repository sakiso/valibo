import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyALf4C9tvk55SMZYUeA9sgzWQBB58jXjNs",
  authDomain: "fufu-project-d3b38.firebaseapp.com",
  databaseURL: "https://fufu-project-d3b38.firebaseio.com",
  projectId: "fufu-project-d3b38",
  storageBucket: "fufu-project-d3b38.appspot.com",
  messagingSenderId: "906542206934",
  appId: "1:906542206934:web:6ecd3c5e9a3c8a21085e77",
  measurementId: "G-ZGMJ3NN0H3"

});

export const db = firebaseApp.firestore();