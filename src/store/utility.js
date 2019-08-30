function updateObject(state, updateObject) {
  return {
    ...state,
    ...updateObject
  };
}

function updateLoading(state, action) {
  return {
    ...state,
    isLoading: action.isLoading
  }
};

function calculateFare(bases, time, distance) {
  const distanceInKm = distance * 0.001;
  const timeInMin = time * 0.0166667;
  const pricePerMinute = bases.timeRate * timeInMin;
  const pricePerKm = bases.distanceRate * distanceInKm;
  const totalFare = bases.baseFare * pricePerKm * pricePerMinute;
  return Math.round(totalFare);
}

export {
  updateObject,
  updateLoading,
  calculateFare
};
