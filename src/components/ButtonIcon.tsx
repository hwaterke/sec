import {Ionicons} from '@expo/vector-icons'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {theme} from '../theming/theme'

type Props = {
  name: keyof typeof Ionicons.glyphMap
  onPress: () => void
}

const Icon = styled(Ionicons)`
  color: ${theme.colors.text.link};
  padding: 0 8px;
`

export const ButtonIcon: React.FC<Props> = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={26} />
    </TouchableOpacity>
  )
}
