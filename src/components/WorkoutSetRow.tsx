import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'
import {formatEpochTimestamp} from '../utils/formatters'
import {WorkoutSetMetrics} from './WorkoutSetMetrics'

const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: white;
  border-bottom-width: ${({theme}) => theme.borderWidth}px;
  border-bottom-color: ${({theme}) => theme.colors.border};
`

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
    <View>
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
