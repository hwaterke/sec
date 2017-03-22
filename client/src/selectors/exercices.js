import {createSelector} from 'reselect';
import R from 'ramda';

export const displayNameOfExercise = (exercise) => {
  if (exercise.cardio) {
    return 'Cardio';
  }
  return exercise.main_muscle || 'Other';
};

export const exercisesByIdSelector = state => state.resources.exercises;

export const exercisesArraySelector = createSelector(
  exercisesByIdSelector,
  exercisesById => Object.values(exercisesById)
);

export const exercisesByNameSelector = createSelector(
  exercisesArraySelector,
  exercisesArray => R.sortBy(R.prop('name'))(exercisesArray)
);

export const exercisesByMuscleThenNameSelector = createSelector(
  exercisesArraySelector,
  exercisesArray => {
    const muscleName = (e) => e.main_muscle || (e.cardio && 'Cardio') || 'zzzz';
    return R.sortWith([
      R.ascend(muscleName),
      R.ascend(R.prop('name'))
    ])(exercisesArray);
  }
);
