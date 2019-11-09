function calculateFare(bases, towTruckType, time, distance) {
  let towTruckFare = 2000;
  if (towTruckType === 'FLATBED') {
    towTruckFare = 3000;
  }
  const distanceInKm = distance * 0.001;
  const timeInMin = time * 0.0166667;
  const pricePerMinute = bases.timeRate * timeInMin;
  const pricePerKm = bases.distanceRate * distanceInKm;
  const totalFare = bases.baseFare * pricePerKm * pricePerMinute;
  return Math.round(totalFare + towTruckFare);
}

function getNewHomeState() {
  const deltas = {
    name: '',
    latitudeDelta: 0.0,
    longitudeDelta: 0.0
  };
  return {
    pickupLocation: {
      ...deltas
    },
    dropoffLocation: {
      ...deltas
    },
    routeInfo: {
      duration: {
        value: null, // in sec
        text: ''
      },
      distance: {
        value: null, // in m
        text: ''
      }
    },
    carType: null,
    towTruckType: null,
    fare: 0.0,
    nearbyDrivers: [],
    acceptedDriver: null
  }
}

export {
  calculateFare
}
