import reduxCrud from 'redux-crud';

export const resourceReducer = (resourceName, key = 'uuid') => {
  const baseReducer = reduxCrud.Map.reducersFor(resourceName, {key});
  return (state, action) => {
    if (action.type === 'RESET_RESOURCES') {
      return baseReducer(undefined, action);
    }
    return baseReducer(state, action);
  };
};
