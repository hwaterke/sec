import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'
import {DateTime} from 'luxon'

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

      {value.repetitions != null && <Text>{value.repetitions}</Text>}

      {value.weight != null && <Text>{value.weight}kg</Text>}

      {value.time != null && <Text>{value.time}</Text>}

      {value.distance != null && <Text>{value.distance}m</Text>}
    </View>
  )
}
