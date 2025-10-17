// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Animated,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import styles from './StyleLogin.js';

// export default function LoginScreen({ navigation }) {
//   const emailAnim = useRef(new Animated.Value(-200)).current;
//   const passwordAnim = useRef(new Animated.Value(-200)).current;
//   const buttonAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     console.log("login screen")
//     Animated.sequence([
//       Animated.timing(emailAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.timing(passwordAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   // Validation schema
//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(6, 'Too Short!').required('Required'),
//   });

//   // Mock login function
//   const handleLogin = values => {
//     const { email, password } = values;

//     authTest(email, password);
//   };

//   const authTest = async (email, passowrd) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         passowrd,
//       );
//       const user = userCredential.user;
//       if (user) {
//         await AsyncStorage.setItem(
//           'user',
//           JSON.stringify({
//             uid: user.uid,
//             email: user.email,
//           }),
//         );
//         navigation("home")
//         console.log('user logged in!', userCredential);
//         return user;
//       } else {
//         console.log('Error occured', userCredential);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <Text style={styles.title}>Welcome Back</Text>

//       <Formik
//         initialValues={{ email: '', password: '' }}
//         validationSchema={LoginSchema}
//         onSubmit={handleLogin}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//         }) => (
//           <>
//             <Animated.View
//               style={[
//                 styles.inputContainer,
//                 { transform: [{ translateX: emailAnim }] },
//               ]}
//             >
//               <TextInput
//                 placeholder="Email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 style={styles.input}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               />
//               {errors.email && touched.email && (
//                 <Text style={{ color: 'red', marginTop: 4 }}>
//                   {errors.email}
//                 </Text>
//               )}
//             </Animated.View>

//             <Animated.View
//               style={[
//                 styles.inputContainer,
//                 { transform: [{ translateX: passwordAnim }] },
//               ]}
//             >
//               <TextInput
//                 placeholder="Password"
//                 secureTextEntry
//                 style={styles.input}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//               />
//               {errors.password && touched.password && (
//                 <Text style={{ color: 'red', marginTop: 4 }}>
//                   {errors.password}
//                 </Text>
//               )}
//             </Animated.View>

//             <Animated.View style={{ opacity: buttonAnim }}>
//               <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Login</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </>
//         )}
//       </Formik>

//       <TouchableOpacity>
//         <Text style={styles.forgot} onPress={()=>navigation.navigate('login')}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// }

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToastError, showToastFailure, showToastSuccess } from '../common/ToastHelper';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    authTest(values?.email, values?.password)
    setSubmitting(false)
    showToastFailure()

  };

  const authTest = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential?.user;

      if (user) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({ uid: user.uid, email: user.email })
        );
        showToastSuccess('Logged In', 'Welcome back!');
        console.log('user logged in!', userCredential);
        navigation.navigate("home")
      } else {
        showToastFailure('Login Failed', 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      showToastError()
      throw err; // propagate error so handleSubmit can catch
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
            </View>

            <TouchableOpacity
              style={[styles.button, (isSubmitting || Object.keys(errors).length > 0) && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              <Text style={styles.buttonText}>{isSubmitting ? 'Signing in...' : 'Sign in'}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontSize: 14,
  },
  input: {
    height: 44,
    color:'#2e2e2e',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  error: {
    color: '#d9534f',
    marginTop: 6,
    fontSize: 12,
  },
  button: {
    height: 48,
    marginTop: 18,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#98c1ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginText: { marginTop: 20, color: '#4a90e2', textDecorationLine: 'underline' },
});
