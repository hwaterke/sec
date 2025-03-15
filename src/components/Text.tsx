import styled from 'styled-components/native'
import {theme} from '../theming/theme'

export const Text = styled.Text`
  color: ${theme.colors.text.primary};
`

export const ErrorText = styled(Text)`
  color: #e7000b;
  font-size: 12px;
`

export const Label = styled(Text)`
  font-size: 12px;
`
