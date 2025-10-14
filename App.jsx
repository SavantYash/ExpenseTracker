/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
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
import Test123 from './src/Components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import { app, auth } from './src/config/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Components/Login.js';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (app) {
      console.log('Success!');
    } else {
      console.log('still work to do!');
    }
  }, []);

  const navigation = useNavigation();

  return (
    // <>
    //   <SafeAreaProvider>
    //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //     {/* <AppContent /> */}
    //     <Test123 />
    //   </SafeAreaProvider>
    // </>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} navigation={navigation} />
        <Stack.Screen name="home" component={Test123}  />
        {/* <Stack.Screen name="AddExpense" component={AddExpenseScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
