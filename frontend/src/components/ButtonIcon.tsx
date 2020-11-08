import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'

type Props = {
  name: string
  onPress: () => void
}

const Icon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.text.link};
  padding: 0 8px;
`

export const ButtonIcon: React.FC<Props> = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={26} />
    </TouchableOpacity>
  )
}
