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

export const exercisesGroupedByMuscle = createSelector(
  select(ExerciseResource).asArray,
  exercices => {
    const groups = groupByMuscle(sortByName(exercices))
    return Object.keys(groups).map(muscle => ({
      data: groups[muscle],
      title: muscle === 'zzzz' ? 'Other' : muscle,
    }))
  }
)
