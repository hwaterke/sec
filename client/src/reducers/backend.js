export const setBackendUrl = (url) => ({
  type: 'SET_BACKEND_URL',
  payload: url
});

export const setBackendPassword = (value) => ({
  type: 'SET_BACKEND_PASSWORD',
  payload: value
});

export const backendReducer = (state = {}, action) => {
  if (action.type === 'SET_BACKEND_URL') {
    return {...state, url: action.payload};
  }
  if (action.type === 'SET_BACKEND_PASSWORD') {
    return {...state, password: action.payload};
  }
  return state;
};
