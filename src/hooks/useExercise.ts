import {useFocusEffect} from '@react-navigation/native'
import {useCallback, useEffect, useState} from 'react'
import {Exercise} from '../database/schema'
import {ExerciseService} from '../services/ExerciseService'

export const useExercise = ({
  id,
  refreshOnFocus,
}: {
  id: string
  refreshOnFocus: boolean
}) => {
  const [exercise, setExercise] = useState<Exercise | null>(null)

  useEffect(() => {
    if (!refreshOnFocus) {
      const main = async () => {
        const data = await ExerciseService.getOne(id)
        setExercise(data)
      }
      void main()
    }
  }, [refreshOnFocus, id])

  useFocusEffect(
    useCallback(() => {
      if (refreshOnFocus) {
        const main = async () => {
          const data = await ExerciseService.getOne(id)
          setExercise(data)
        }
        void main()
      }
    }, [refreshOnFocus, id])
  )

  return [exercise]
}
