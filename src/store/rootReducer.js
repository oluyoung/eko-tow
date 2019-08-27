import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import mapReducer from './reducers/mapReducer';

const rootReducer = combineReducers({
  map: mapReducer,
  auth: authReducer
});

export default rootReducer;
