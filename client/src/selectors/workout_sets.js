import {arraySelector, byIdSelector} from 'hw-react-shared';
import moment from 'moment';
import R from 'ramda';
import {createSelector} from 'reselect';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {ExerciseResource} from '../entities/ExerciseResource';

export const workoutSetsByDateSelector = createSelector(
  arraySelector(WorkoutSetResource),
  workoutSetsArray => R.sort(R.descend(R.prop('executed_at')))(workoutSetsArray)
);

export const lastWorkoutSetByExerciseSelector = createSelector(
  arraySelector(WorkoutSetResource),
  workoutSetsArray =>
    R.map(R.compose(R.last, R.sortBy(R.prop('executed_at'))))(
      R.groupBy(R.prop('exercise_uuid'))(workoutSetsArray)
    )
);

// Returns Sets grouped by day
export const workoutSetsByDaySelector = createSelector(
  workoutSetsByDateSelector,
  workoutSets => {
    const day = ws =>
      moment(ws.executed_at, 'YYYY-MM-DD').format('dddd, D MMMM');
    const byDate = R.groupBy(day);
    return byDate(workoutSets);
  }
);

// Returns Sets grouped by day as a list of sections
export const workoutSetsByDayByExerciseSectionsSelector = createSelector(
  workoutSetsByDaySelector,
  byIdSelector(ExerciseResource),
  (workoutSetsByDay, exercisesById) => {
    const groupByExerciseName = R.groupBy(
      ws => exercisesById[ws.exercise_uuid].name
    );

    const convertToArray = obj =>
      Object.keys(obj).map(name => ({
        data: obj[name],
        title: name
      }));

    return R.map(
      R.compose(convertToArray, groupByExerciseName),
      workoutSetsByDay
    );
  }
);

// Returns Sets grouped by day and then by exercise
export const workoutSetsByDayAndExerciseSelector = createSelector(
  workoutSetsByDaySelector,
  workoutSetsByDay => {
    const byExercise = R.groupBy(R.prop('exercise_uuid'));
    const sortByDate = R.map(R.sortBy(R.prop('executed_at')));
    return R.map(byExercise)(sortByDate(workoutSetsByDay));
  }
);
