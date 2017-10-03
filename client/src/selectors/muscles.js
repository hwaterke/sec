import {arraySelector} from 'hw-react-shared';
import R from 'ramda';
import {createSelector} from 'reselect';
import {MuscleResource} from '../entities/MuscleResource';

export const musclesWithCardioArraySelector = createSelector(
  arraySelector(MuscleResource),
  muscles => R.sortBy(R.prop('name'), [...muscles, {name: 'Cardio'}])
);
