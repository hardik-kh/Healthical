import React, { useState, useEffect, createContext } from 'react'
import * as firebase from 'firebase';
import apiKeys from './src/Config/firebaseConfig';
import AuthStack from './src/Navigation/AuthStack'
import HomeStack from './src/Navigation/HomeStack'

import { AuthContext } from "./src/Context/Context";



const App = () => {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)

    // unsubscribe on unmount
    return authSubscriber
  }, [])

  if (initializing) {
    return null
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <HomeStack />
    </AuthContext.Provider>
  ) : (
    <AuthStack />
  )
};
export default App;
