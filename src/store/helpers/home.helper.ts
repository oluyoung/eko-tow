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

export {
  calculateFare
}
