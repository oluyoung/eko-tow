function setNewTowBooking(store) {
  return {
    username: store().auth.username,
    userId: store().auth.user.id,
    pickupLocation: {
      address: store().home.pickupLocation.address,
      name: store().home.pickupLocation.name,
      latitude: store().home.pickupLocation.latitude,
      longitude: store().home.pickupLocation.longitude
    },
    dropoffLocation: {
      address: store().home.dropoffLocation.address,
      name: store().home.dropoffLocation.name,
      latitude: store().home.dropoffLocation.latitude,
      longitude: store().home.dropoffLocation.longitude
    },
    fare: store().home.fare
  };
}

export {
  setNewTowBooking
}
