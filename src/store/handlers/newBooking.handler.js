import { updateObject } from '../utility';

const handleCreateTowBooking = (state, action) => {
  return updateObject(state, {
    towBooking: action.towBooking
  });
};

const handleUpdateTowBooking = (state, action) => {
  return updateObject(state, {
    towBooking: action.towBooking
  });
};

const handleSetAcceptedDriver = (state, action) => {
  return updateObject(state, {
    towBooking: updateObject(state.towBooking, {
      driver: action.driver
    })
  });
};

const handleCancelTowBooking = (state, action) => {
  return updateObject(state, {
    towBooking: updateObject(state.towBooking, {
      status: 'CANCELED'
    })
  });
}

const ACTION_HANDLERS = {
  CREATE_TOW_BOOKING: handleCreateTowBooking,
  UPDATE_TOW_BOOKING: handleUpdateTowBooking,
  CANCEL_TOW_BOOKING: handleCancelTowBooking,
  SET_ACCEPTED_DRIVER: handleSetAcceptedDriver
};

export default ACTION_HANDLERS;
