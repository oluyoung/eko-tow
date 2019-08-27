export function updateObject(state, updateObject) {
  return {
    ...state,
    ...updateObject
  };
}

export function updateLoading(state, action) {
  return {
    ...state,
    isLoading: action.isLoading
  }
};
