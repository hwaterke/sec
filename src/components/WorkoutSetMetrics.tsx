import React from 'react'
import {Text, View} from 'react-native'

type Props = {
  repetitions?: number | null
  weight?: number | null
  distance?: number | null
  time?: string | null
}

export const WorkoutSetMetrics = ({
  repetitions,
  weight,
  distance,
  time,
}: Props) => {
  return (
    <View className="flex-row">
      {repetitions != null && (
        <>
          <Text>{repetitions}</Text>
          <Text className="text-gray-500"> x </Text>
        </>
      )}

      {weight != null && (
        <>
          <Text>{weight}</Text>
          <Text className="text-gray-500"> kg</Text>
        </>
      )}

      {time != null && <Text>{time} </Text>}

      {distance != null && (
        <>
          <Text>{distance}</Text>
          <Text className="text-gray-500"> m</Text>
        </>
      )}
    </View>
  )
}
