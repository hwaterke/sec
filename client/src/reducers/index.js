import {
  createActivityReducersForResources,
  createReducersForResources,
} from 'redux-crud-provider'
import {reducer as formReducer} from 'redux-form'
import {ExerciseResource} from '../entities/ExerciseResource'
import {MuscleResource} from '../entities/MuscleResource'
import {WorkoutSetResource} from '../entities/WorkoutSetResource'
import {authenticationReducer} from './authentication'
import {backendReducer} from './backend'

export const reducers = {
  backend: backendReducer,
  form: formReducer,
  resources: createReducersForResources([
    MuscleResource,
    ExerciseResource,
    WorkoutSetResource,
  ]),
  resourcesActivity: createActivityReducersForResources([
    MuscleResource,
    ExerciseResource,
    WorkoutSetResource,
  ]),
  token: authenticationReducer,
}
