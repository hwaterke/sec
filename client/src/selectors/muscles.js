import {createSelector} from 'reselect'
import {select} from 'redux-crud-provider'
import {prop, sortBy} from 'ramda'
import {MuscleResource} from '../entities/MuscleResource'

export const musclesSortedSelector = createSelector(
  select(MuscleResource).asArray,
  sortBy(prop('name'))
)
