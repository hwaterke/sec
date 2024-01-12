export interface DatabaseExercise {
  uuid: string
  name: string
  description: string | null

  has_repetitions: number
  has_weight: number
  has_time: number
  has_distance: number

  muscle: string

  is_cardio: number
  is_machine: number
  is_dumbbell: number
  is_barbell: number

  created_at: string
  updated_at: string
}

export interface Exercise {
  uuid: string
  name: string
  description: string | null

  hasRepetitions: boolean
  hasWeight: boolean
  hasTime: boolean
  hasDistance: boolean

  muscle: string

  isCardio: boolean
  isMachine: boolean
  isDumbbell: boolean
  isBarbell: boolean

  createdAt: string
  updatedAt: string
}

export interface DatabaseWorkoutSet {
  uuid: string

  repetitions: number | null
  weight: number | null
  time: string | null
  distance: number | null

  notes: string | null

  executed_at: string
  exercise_uuid: string

  created_at: string
  updated_at: string
}

export interface WorkoutSet {
  uuid: string

  repetitions: number | null
  weight: number | null
  time: string | null
  distance: number | null

  notes: string | null

  executedAt: string
  exerciseUuid: string

  createdAt: string
  updatedAt: string
}

export interface WorkoutSetWithExercise extends WorkoutSet {
  exercise: {
    name: string
    hasRepetitions: boolean
    hasWeight: boolean
    hasTime: boolean
    hasDistance: boolean
  }
}
