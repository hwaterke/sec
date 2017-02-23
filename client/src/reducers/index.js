import {navigationReducer} from './navigation';
import {combineReducers} from 'redux';
import {backendReducer} from './backend';
import {reducer as formReducer} from 'redux-form';
import {resourceReducer} from './resourceReducer';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {authenticationReducer} from './authentication';

export const appReducer = combineReducers({
  navigation: navigationReducer,
  backend: backendReducer,
  form: formReducer,
  exercises: resourceReducer(ExerciseResource.path),
  workout_sets: resourceReducer(WorkoutSetResource.path),
  token: authenticationReducer
});
