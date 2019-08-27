import * as actionType from './actions';

export const handleLogin = (email, password) => {
  return {
    type: actionType.HANDLE_LOGIN,
    email,
    password
  };
}

export const handleSignup = (email, password) => {
  return {
    type: actionType.HANDLE_SIGNUP,
    email,
    password
  };
}

export const setEmail = email => {
  return {
    type: actionType.SET_EMAIL,
    email
  };
}

export const setPassword = password => {
  return {
    type: actionType.SET_PASSWORD,
    password
  };
}

export const switchToSignup = () => {
  return {
    type: actionType.SWITCH_TO_SIGNUP
  };
}

export const switchToLogin = () => {
  return {
    type: actionType.SWITCH_TO_LOGIN
  };
}
