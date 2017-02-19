import {createSelector} from 'reselect';
import R from 'ramda';

export const workoutSetsByIdSelector = state => state.workout_sets;

export const workoutSetsArraySelector = createSelector(
  workoutSetsByIdSelector,
  workoutSetsById => Object.values(workoutSetsById)
);

export const workoutSetsByDateSelector = createSelector(
  workoutSetsArraySelector,
  workoutSetsArray => R.sort(R.descend(R.prop('executed_at')))(workoutSetsArray)
);

export const lastWorkoutSetByExerciseSelector = createSelector(
  workoutSetsArraySelector,
  workoutSetsArray => R.map(R.compose(R.last, R.sortBy(R.prop('executed_at'))))(R.groupBy(R.prop('exercise_uuid'))(workoutSetsArray))
);
