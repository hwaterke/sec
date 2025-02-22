import {eq} from 'drizzle-orm'
import {db} from '../../database/datasource'
import {Exercise, exercisesTable, InsertExercise} from '../../database/schema'
import {nilAndEmptyToNull} from '../../database/utils'
import {useCallback, useEffect, useState} from 'react'
import {useFocusEffect} from '@react-navigation/native'

export const ExerciseService = {
  getAll: async () => {
    return db.select().from(exercisesTable).orderBy(exercisesTable.name)
  },

  getOne: async (id: string) => {
    const result = await db
      .select()
      .from(exercisesTable)
      .where(eq(exercisesTable.id, id))
      .limit(1)
    return result[0] ?? null
  },

  create: async (data: InsertExercise) => {
    return db.insert(exercisesTable).values({
      name: data.name,
      description: nilAndEmptyToNull(data.description),
      hasRepetitions: data.hasRepetitions,
      hasWeight: data.hasWeight,
      hasTime: data.hasTime,
      hasDistance: data.hasDistance,
      muscle: data.muscle,
      isCardio: data.isCardio,
      isMachine: data.isMachine,
      isDumbbell: data.isDumbbell,
      isBarbell: data.isBarbell,
    })
  },

  update: async ({id, data}: {id: string; data: InsertExercise}) => {
    return db
      .update(exercisesTable)
      .set({
        name: data.name,
        description: nilAndEmptyToNull(data.description),
        hasRepetitions: data.hasRepetitions,
        hasWeight: data.hasWeight,
        hasTime: data.hasTime,
        hasDistance: data.hasDistance,
        muscle: data.muscle,
        isCardio: data.isCardio,
        isMachine: data.isMachine,
        isDumbbell: data.isDumbbell,
        isBarbell: data.isBarbell,
      })
      .where(eq(exercisesTable.id, id))
  },

  remove: async ({id}: {id: string}) => {
    return db.delete(exercisesTable).where(eq(exercisesTable.id, id))
  },
}

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
