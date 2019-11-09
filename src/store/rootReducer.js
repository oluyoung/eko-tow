import { combineReducers } from 'redux';
import authReducer from './reducers/auth.reducer';
import homeReducer from './reducers/home.reducer';
import newBookingReducer from './reducers/newBooking.reducer';
import towBookingsReducer from './reducers/towBookings.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  newBooking: newBookingReducer,
  towBookings: towBookingsReducer
});

export default rootReducer;
