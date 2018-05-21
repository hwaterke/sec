import React from 'react'
import styled from 'styled-components'

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const EmptyText = styled.Text`
  font-size: 25;
  text-align: center;
`

export const EmptyExercisesList = () => (
  <EmptyContainer>
    <EmptyText>Start working out by adding some exercises! 🏋️‍♀️</EmptyText>
  </EmptyContainer>
)
