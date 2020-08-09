import React from 'react'
import styled from '../theming/styled-components'

const Container = styled.View`
  background-color: ${({theme}) => theme.background.primary};
  padding-left: 8px;
`

const Text = styled.Text`
  color: ${({theme}) => theme.text.primary};
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
