/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NewAppScreen } from '@react-native/new-app-screen';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import Test123 from './src/Components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import { app, auth } from './src/config/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Components/Login.js';
import RegisterScreen from './src/Components/RegisterScreen.js';
import AppTabs from './src/Components/AppTabs.js';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/config/AppContext.js';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [base, setbase] = useState(null)

  useEffect(() => {
    if (app) {
      console.log('Success!');
    } else {
      console.log('still work to do!');
    }
  }, []);

  // if (!base) {
  //   // still loading
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log("user", user)
        if (user) {
          console.log("home")
          setbase('home');
        } else {
          setbase('login');
        }
      } catch (err) {
        console.error('Failed to load user from storage', err);
        setbase('login');
      }
    };

    checkLogin();
  }, []);

  // const checkUserLoggedIn = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('user');
  //     if (user) setbase("home");
  //     else setbase("login");
  //     console.log(base)
  //   } catch (err) {
  //     setbase("login")
  //     console.log('from App.js 52 while checking user on storage', err);
  //   }
  // };

  return (
    // <>
    //   <SafeAreaProvider>
    //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //     {/* <AppContent /> */}
    //     <Test123 />
    //   </SafeAreaProvider>
    // </>
    <AppProvider>{
      base &&
      <NavigationContainer>
        <Stack.Navigator initialRouteName={base}>
          <Stack.Screen
            name="login"
            component={LoginScreen}
          />
          <Stack.Screen
          name="register"
          component={RegisterScreen}
          />
          <Stack.Screen name="home" component={AppTabs} />


          {/* <Stack.Screen name="AddExpense" component={AddExpenseScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    }
      <Toast />
    </AppProvider>
  );
}


function Test123() {
  return (
    <View>
      <Text>Hiiiiwwwwwwwwwwwwwwwwww</Text>
    </View>
  )
}

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
