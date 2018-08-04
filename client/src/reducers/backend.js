export const setBackendUrl = url => ({
  type: 'SET_BACKEND_URL',
  payload: url
});

export const backendReducer = (state = null, action) => {
  if (action.type === 'SET_BACKEND_URL') {
    return action.payload;
  }
  if (action.type === 'CLEAR_BACKEND_URL') {
    return null;
  }
  return state;
};
