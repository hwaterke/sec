import {combineReducers} from 'redux';
import {resourceReducer} from './resourceReducer';
import {MuscleResource} from '../entities/MuscleResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';

export const resourcesReducer = combineReducers({
  muscles: resourceReducer(MuscleResource.path, 'name'),
  exercises: resourceReducer(ExerciseResource.path),
  workout_sets: resourceReducer(WorkoutSetResource.path)
});
