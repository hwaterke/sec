import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, useState} from 'react'
import {DATASOURCE} from '../../database/datasource'
import {Exercise} from '../../database/entities/exercise.entity'
import {WorkoutSet} from '../../database/entities/workout_set.entity'

type ExercisePayload = {
  name: string
  description: string
  hasRepetitions: boolean
  hasWeight: boolean
  hasTime: boolean
  hasDistance: boolean
  muscle: string
  isCardio: boolean
  isMachine: boolean
  isDumbbell: boolean
  isBarbell: boolean
}

export const ExerciseService = {
  getAll: () => {
    const repo = DATASOURCE.getRepository(Exercise)
    return repo.find()
  },

  getOne: (uuid: string) => {
    const repo = DATASOURCE.getRepository(Exercise)
    return repo.findOneBy({uuid})
  },

  getLastWorkoutSets: (uuid: string) => {
    const repo = DATASOURCE.getRepository(WorkoutSet)
    return repo.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      where: {
        exercise: {
          uuid,
        },
      },
    })
  },

  create: (data: ExercisePayload) => {
    const repo = DATASOURCE.getRepository(Exercise)
    return repo.save(data)
  },

  update: ({uuid, data}: {uuid: string; data: ExercisePayload}) => {
    const repo = DATASOURCE.getRepository(Exercise)
    return repo.update(uuid, data)
  },

  remove: ({uuid}: {uuid: string}) => {
    const repo = DATASOURCE.getRepository(Exercise)
    return repo.delete(uuid)
  },
}

export const useExercise = ({
  uuid,
  refreshOnFocus,
}: {
  uuid: string
  refreshOnFocus: boolean
}) => {
  const [exercise, setExercise] = useState<Exercise | null>(null)

  useEffect(() => {
    if (!refreshOnFocus) {
      const main = async () => {
        const data = await ExerciseService.getOne(uuid)
        setExercise(data)
      }
      main()
    }
  }, [refreshOnFocus])

  useFocusEffect(
    useCallback(() => {
      if (refreshOnFocus) {
        const main = async () => {
          const data = await ExerciseService.getOne(uuid)
          setExercise(data)
        }
        main()
      }
    }, [refreshOnFocus])
  )

  return [exercise]
}
