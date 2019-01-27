import moment from 'moment'
import {
  compose,
  descend,
  groupBy,
  last,
  map,
  pipe,
  prop,
  sort,
  sortBy,
  toPairs,
} from 'ramda'
import {select} from 'redux-crud-provider'
import {createSelector} from 'reselect'
import {WorkoutSetResource} from '../entities/WorkoutSetResource'

export const workoutSetsByDateDescSelector = createSelector(
  select(WorkoutSetResource).asArray,
  workoutSetsArray => sort(descend(prop('executed_at')))(workoutSetsArray)
)

export const lastWorkoutSetByExerciseSelector = createSelector(
  select(WorkoutSetResource).asArray,
  workoutSetsArray =>
    map(
      compose(
        last,
        sortBy(prop('executed_at'))
      )
    )(groupBy(prop('exercise_uuid'))(workoutSetsArray))
)

// Returns Sets grouped by day
export const workoutSetsByDaySelector = createSelector(
  workoutSetsByDateDescSelector,
  workoutSets => {
    const day = ws => moment(ws.executed_at, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const byDate = groupBy(day)
    return byDate(workoutSets)
  }
)

export const workoutSetsByExercise = createSelector(
  select(WorkoutSetResource).asArray,
  workoutSets => groupBy(prop('exercise_uuid'))(workoutSets)
)

export const workoutSetsGroupedByDateAndExerciseSelector = createSelector(
  workoutSetsByDaySelector,
  map(groupBy(ws => ws.exercise_uuid))
)

/**
 * Returns Workout Sets grouped by day as a list of sections (each exercise is a section)
 */
export const workoutSetsGroupedByDateExerciseSectionsSelector = createSelector(
  workoutSetsGroupedByDateAndExerciseSelector,
  map(
    pipe(
      toPairs,
      map(([exerciseUuid, workoutSets]) => ({
        data: workoutSets,
        exerciseUuid,
      }))
    )
  )
)
