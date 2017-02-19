import reduxCrud from 'redux-crud';

export const resourceReducer = (resourceName) => {
  const baseReducer = reduxCrud.Map.reducersFor(resourceName, {key: 'uuid'});
  return (state, action) => {
    if (action.type === 'RESET_RESOURCES') {
      return baseReducer(undefined, action);
    }
    return baseReducer(state, action);
  };
};
