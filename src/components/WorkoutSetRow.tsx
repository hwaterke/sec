import {DateTime} from 'luxon'
import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'
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
    executedAt: string
    repetitions?: number | null
    weight?: number | null
    distance?: number | null
    time?: string | null
  }
  withDate?: boolean
}

export const WorkoutSetRow = ({value, withDate}: Props) => {
  return (
    <View>
      <Text>
        {DateTime.fromISO(value.executedAt).toLocaleString(
          withDate ? DateTime.DATETIME_SHORT : DateTime.TIME_24_SIMPLE
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
