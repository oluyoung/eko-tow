import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer
});

export default rootReducer;
