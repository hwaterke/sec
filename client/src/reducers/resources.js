// @flow
import {MuscleResource} from '../entities/MuscleResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {reducersForResources} from 'hw-react-shared';

export const resourcesReducer = reducersForResources([
  MuscleResource,
  ExerciseResource,
  WorkoutSetResource
]);
