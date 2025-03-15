import React from 'react'
import {Text, View} from 'react-native'
import {formatEpochTimestamp} from '../utils/formatters'
import {WorkoutSetMetrics} from './WorkoutSetMetrics'

type Props = {
  value: {
    executedAt: number
    repetitions?: number | null
    weight?: number | null
    distance?: number | null
    time?: string | null
  }
  withDate?: boolean
}

export const WorkoutSetRow = ({value}: Props) => {
  return (
    <View className="flex-row justify-between p-2 bg-white border-b border-gray-200">
      <Text>{formatEpochTimestamp(value.executedAt)}</Text>
      <WorkoutSetMetrics
        repetitions={value.repetitions}
        weight={value.weight}
        distance={value.distance}
        time={value.time}
      />
    </View>
  )
}
