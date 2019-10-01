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

export {
  updateObject,
  updateLoading
};
