import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'
import {DateTime} from 'luxon'
import {WorkoutSetMetrics} from './WorkoutSetMetrics'

const View = styled.View`
  padding: 8px 12px;
  background-color: white;
  border-bottom-width: ${({theme}) => theme.borderWidth}px;
  border-bottom-color: ${({theme}) => theme.colors.border};
`

type Props = {
  executedAt: string
  repetitions?: number
  weight?: number
  distance?: number
  time?: string
}

export const WorkoutSetRow = ({value}: {value: Props}) => {
  return (
    <View>
      <Text>
        {DateTime.fromISO(value.executedAt).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </Text>

      <WorkoutSetMetrics
        repetitions={value.repetitions}
        weight={value.weight}
        distance={value.distance}
        time={value.time}
      />
    </View>
  )
}
