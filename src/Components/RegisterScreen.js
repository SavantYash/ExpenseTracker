import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../config/firebase';
import { showToastError, showToastSuccess } from '../common/ToastHelper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  setDoc } from 'firebase/firestore';

// Validation schema
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function RegisterScreen({ navigation }) {
  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const confirmAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate fields with fade-in & slight upward slide
    Animated.stagger(150, [
      Animated.timing(emailAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(passwordAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(confirmAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRegister = async values => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const userdbref = doc(db, 'EIDB', user?.user.uid);
      await setDoc(userdbref, {
        id: 1,
        monthlyGraph: {
          expense: [{}],
          income: [{}],
        },
      });
      setAsyncItem('user', {
        uid: user.uid,
        email: user.email,
      });
      showToastSuccess('User signed Up!');
      navigation.navigate('home'); // navigate to login page
    } catch (error) {
      showToastError('Error occured!');
      console.log('error', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Create Account</Text>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Animated.View
              style={{
                opacity: emailAnim,
                transform: [
                  {
                    translateY: emailAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </Animated.View>

            <Animated.View
              style={{
                opacity: passwordAnim,
                transform: [
                  {
                    translateY: passwordAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </Animated.View>

            <Animated.View
              style={{
                opacity: confirmAnim,
                transform: [
                  {
                    translateY: confirmAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                style={styles.input}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </Animated.View>

            <Animated.View style={{ opacity: buttonAnim, marginTop: 20 }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 30,
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 40, color: '#333' },
  input: {
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    width: 300,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  loginText: {
    marginTop: 20,
    color: '#4a90e2',
    textDecorationLine: 'underline',
  },
  error: { color: 'red', marginBottom: 5, marginLeft: 5 },
});
