export const saveToken = token => ({
  type: 'SET_TOKEN',
  payload: token,
})

export const clearToken = () => ({
  type: 'CLEAR_TOKEN',
})

export const authenticationReducer = (state = null, action) => {
  if (action.type === 'SET_TOKEN') {
    return action.payload
  }
  if (action.type === 'CLEAR_TOKEN') {
    return null
  }
  return state
}
