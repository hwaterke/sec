import {createSelector} from 'reselect';
import R from 'ramda';

export const musclesByIdSelector = state => state.resources.muscles;

export const musclesArraySelector = createSelector(
  musclesByIdSelector,
  musclesById => R.sortBy(R.prop('name'), Object.values(musclesById))
);
