import {ascend, groupBy, prop, sortWith} from 'ramda'
import {select} from 'redux-crud-provider'
import {createSelector} from 'reselect'
import {ExerciseResource} from '../entities/ExerciseResource'

export const displayNameOfExercise = exercise => {
  if (exercise.cardio) {
    return 'Cardio'
  }
  return exercise.main_muscle || 'Other'
}

const muscleName = e => e.main_muscle || (e.cardio && 'Cardio') || 'zzzz'
const sortByName = sortWith([ascend(muscleName), ascend(prop('name'))])
const groupByMuscle = groupBy(muscleName)

const exercisesSortedSelector = createSelector(
  select(ExerciseResource).asArray,
  sortByName
)

export const exercisesGroupedByMuscleSelector = createSelector(
  exercisesSortedSelector,
  groupByMuscle
)

export const exercisesGroupedByMuscleSectionsSelector = createSelector(
  exercisesGroupedByMuscleSelector,
  exercicesByMuscle => {
    return Object.keys(exercicesByMuscle).map(muscle => ({
      data: exercicesByMuscle[muscle],
      title: muscle === 'zzzz' ? 'Other' : muscle,
    }))
  }
)
