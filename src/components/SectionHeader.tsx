import React from 'react'
import styled from 'styled-components/native'
import {pl, py} from '../design/constants/spacing'

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background.primary};
  ${pl(2)};
  ${py(1)};
`

const Text = styled.Text`
  color: ${({theme}) => theme.colors.text.header};
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
