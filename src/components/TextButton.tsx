import React from 'react'
import {Button, ButtonProps} from 'react-native'
import {useTheme} from 'styled-components/native'

export const TextButton = (props: ButtonProps) => {
  const theme = useTheme()

  return <Button {...props} color={theme.colors.text.link} />
}
