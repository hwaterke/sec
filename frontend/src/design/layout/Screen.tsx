import styled from 'styled-components/native'
import {getSpacingValue} from '../constants/spacing'

export const Screen = styled.View<{
  withPadding?: boolean
}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background.secondary};
  padding: ${({withPadding}) =>
    withPadding ? `${getSpacingValue(6)}px` : '0'};
`
