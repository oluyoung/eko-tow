import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import towBookingsReducer from './reducers/towBookingsReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  towBookings: towBookingsReducer
});

export default rootReducer;
