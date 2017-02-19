import {SecTabNavigator} from '../components/TabNavigator';

export const navigationReducer = (state, action) => {
  return SecTabNavigator.router.getStateForAction(action, state);
};
