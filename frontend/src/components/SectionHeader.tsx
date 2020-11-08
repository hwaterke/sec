import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background.primary};
  padding-left: 8px;
`

const Text = styled.Text`
  color: ${({theme}) => theme.colors.text.primary};
`

type Props = {
  children: string
}

export const SectionHeader: React.FC<Props> = ({children}) => {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  )
}
