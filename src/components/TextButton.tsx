import React from 'react'
import {Button, ButtonProps} from 'react-native'
import {theme} from '../theming/theme'

export const TextButton = (props: ButtonProps) => {
  return <Button {...props} color={theme.colors.text.link} />
}
