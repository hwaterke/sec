import {createSelector} from 'reselect';
import R from 'ramda';
import moment from 'moment';

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

// Returns Sets grouped by day
export const workoutSetsByDaySelector = createSelector(
  workoutSetsByDateSelector,
  workoutSets => {
    const day = (ws) => moment(ws.executed_at, 'YYYY-MM-DD').format('D MMM');
    const byDate = R.groupBy(day);
    return byDate(workoutSets);
  }
);

// Returns Sets grouped by day and then by exercise
export const workoutSetsByDayAndExerciseSelector = createSelector(
  workoutSetsByDaySelector,
  workoutSetsByDay => {
    const byExercise = R.groupBy(R.prop('exercise_uuid'));
    return R.map(byExercise)(workoutSetsByDay);
  }
);
