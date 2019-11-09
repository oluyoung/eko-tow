import * as actionType from './actions';
import axiosBackend from '../../axios-backend';

export const handleLogin = (email, password) => {
  return (dispatch, store) => {
    // send to mongodb
    const reqData = {
      email: store().auth.email,
      password: store().auth.password
    };
    axiosBackend.post('', reqData);
      .then()
      .catch()
  };
}

export const handleSignup = (email, password) => {
  return (dispatch, store) => {
    // send to mongodb
    const reqData = {
      email: store().auth.email,
      password: store().auth.password
    };
    axiosBackend.post('', reqData);
      .then()
      .catch()
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
