import moment from 'moment'
import {compose, descend, groupBy, last, map, prop, sort, sortBy} from 'ramda'
import {select} from 'redux-crud-provider'
import {createSelector} from 'reselect'
import {ExerciseResource} from '../entities/ExerciseResource'
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
    const day = ws =>
      moment(ws.executed_at, 'YYYY-MM-DD').format('dddd, D MMMM')
    const byDate = groupBy(day)
    return byDate(workoutSets)
  }
)

export const workoutSetsByExercise = createSelector(
  select(WorkoutSetResource).asArray,
  workoutSets => groupBy(prop('exercise_uuid'))(workoutSets)
)

// Returns Sets grouped by day as a list of sections
export const workoutSetsByDayByExerciseSectionsSelector = createSelector(
  workoutSetsByDaySelector,
  select(ExerciseResource).byId,
  (workoutSetsByDay, exercisesById) => {
    const groupByExerciseName = groupBy(
      ws => exercisesById[ws.exercise_uuid].name
    )

    const convertToArray = obj =>
      Object.keys(obj).map(name => ({
        data: obj[name],
        title: name,
      }))

    return map(
      compose(
        convertToArray,
        groupByExerciseName
      ),
      workoutSetsByDay
    )
  }
)
