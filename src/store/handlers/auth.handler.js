import { updateObject } from '../utility';

function handleLogin(state, action) {
  return state;
}

function handleSignup(state, action) {
  return state;
}

function handleSetEmail(state, action) {
  return updateObject(state, {email: action.email});
}

function handleSetPassword(state, action) {
  return updateObject(state, {password: action.password});
}

function handleSwitchToLogin(state, action) {
  return updateObject(state, {
    email: '',
    password: '',
    isLogin: true
  });
}

function handleSwitchToSignup() {
  return updateObject(state, {
    email: '',
    password: '',
    isLogin: false
  });
}

const ACTION_HANDLERS = {
  HANDLE_LOGIN: handleLogin,
  HANDLE_SIGNUP: handleSignup,
  SET_EMAIL: handleSetEmail,
  SET_PASSWORD: handleSetPassword,
  SWITCH_TO_LOGIN: handleSwitchToLogin,
  SWITCH_TO_SIGNUP: handleSwitchToSignup
}

export default ACTION_HANDLERS;
