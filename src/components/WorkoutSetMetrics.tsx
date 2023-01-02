import React from 'react'
import styled from 'styled-components/native'
import {Text} from '../components/Text'

const Row = styled.View`
  flex-direction: row;
`

const LightText = styled.Text`
  color: ${({theme}) => theme.colors.text.secondary};
`

type Props = {
  repetitions?: number
  weight?: number
  distance?: number
  time?: string
}

export const WorkoutSetMetrics = ({
  repetitions,
  weight,
  distance,
  time,
}: Props) => {
  return (
    <Row>
      {repetitions != null && (
        <>
          <Text>{repetitions}</Text>
          <LightText> x </LightText>
        </>
      )}

      {weight != null && (
        <>
          <Text>{weight}</Text>
          <LightText> kg</LightText>
        </>
      )}

      {time != null && <Text>{time} </Text>}

      {distance != null && (
        <>
          <Text>{distance}</Text>
          <LightText> m</LightText>
        </>
      )}
    </Row>
  )
}
