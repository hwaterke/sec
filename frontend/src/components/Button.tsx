import React from 'react'
import {GestureResponderEvent} from 'react-native'
import styled from 'styled-components/native'
import {mt} from '../design/constants/spacing'

const Touchable = styled.TouchableOpacity<{withTopMargin?: boolean}>`
  background-color: ${({theme}) => theme.colors.button.primary.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 56px;
  ${({withTopMargin}) => (withTopMargin ? mt(4) : undefined)}
`

const Text = styled.Text`
  color: ${({theme}) => theme.colors.button.primary.text};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 18px;
  text-align: center;
`

type Props = {
  onPress: (event: GestureResponderEvent) => void
  withTopMargin?: boolean
}

export const Button: React.FC<Props> = ({onPress, withTopMargin, children}) => {
  return (
    <Touchable onPress={onPress} withTopMargin={withTopMargin}>
      <Text>{children}</Text>
    </Touchable>
  )
}
