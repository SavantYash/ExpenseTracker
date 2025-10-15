import Toast from 'react-native-toast-message';

export const showToastSuccess = (text1 = 'Login Successful', text2 = 'Welcome back 👋') => {
  Toast.show({
    type: 'success', // fixed type
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000, // 3 seconds
    autoHide: true,
    topOffset: 50,
  });
};

export const showToastFailure = (text1 = 'Invalid credentials', text2 = 'Please check your email or password') => {
  Toast.show({
    type: 'error', // fixed type
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showToastError = (text1 = 'Error Occured!', text2 = 'Try again later!') => {
  Toast.show({
    type: 'error', // fixed type
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};