import {createSelector} from 'reselect';
import R from 'ramda';

export const exercisesByIdSelector = state => state.resources.exercises;

export const exercisesArraySelector = createSelector(
  exercisesByIdSelector,
  exercisesById => Object.values(exercisesById)
);

export const exercisesByNameSelector = createSelector(
  exercisesArraySelector,
  exercisesArray => R.sortBy(R.prop('name'))(exercisesArray)
);
