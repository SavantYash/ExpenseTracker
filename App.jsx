/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Test123 from './src/Components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase 
import { app, auth } from "./src/config/firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (app) {
      console.log("Success!")
      authTest()
    } else {
      console.log("still work to do!")
    }
  }, [])

  const authTest = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "test123@gmail.com", "Test@123");
      const user = userCredential.user
      await AsyncStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      email: user.email,
    }));
      console.log("user logged in!", userCredential)
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {/* <AppContent /> */}
        <Test123 />
      </SafeAreaProvider>
    </>

  );
}

// import React from 'react'

// function Test123() {
//   return (
//     <View style={styles.container}>
//       <Text>Hiiii</Text>
//     </View>
//   )
// }


function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
