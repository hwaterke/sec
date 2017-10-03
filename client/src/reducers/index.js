import {combineReducers} from 'redux';
import {backendReducer} from './backend';
import {reducer as formReducer} from 'redux-form';
import {authenticationReducer} from './authentication';
import {resourcesReducer} from './resources';

export const appReducer = combineReducers({
  backend: backendReducer,
  form: formReducer,
  resources: resourcesReducer,
  token: authenticationReducer
});
