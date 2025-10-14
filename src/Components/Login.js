import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './LoginScreen.styles';

export default function LoginScreen({ navigation }) {
  const emailAnim = useRef(new Animated.Value(-200)).current;
  const passwordAnim = useRef(new Animated.Value(-200)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(emailAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(passwordAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
  });

  // Mock login function
  const handleLogin = values => {
    const { email, password } = values;

    authTest(email, password);
  };

  const authTest = async (email, passowrd) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        passowrd,
      );
      const user = userCredential.user;
      if (user) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        );
        navigation("home")
        console.log('user logged in!', userCredential);
        return user;
      } else {
        console.log('Error occured', userCredential);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Welcome Back</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
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
              style={[
                styles.inputContainer,
                { transform: [{ translateX: emailAnim }] },
              ]}
            >
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {errors.email}
                </Text>
              )}
            </Animated.View>

            <Animated.View
              style={[
                styles.inputContainer,
                { transform: [{ translateX: passwordAnim }] },
              ]}
            >
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {errors.password}
                </Text>
              )}
            </Animated.View>

            <Animated.View style={{ opacity: buttonAnim }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Formik>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
