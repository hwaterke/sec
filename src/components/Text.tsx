import styled from 'styled-components/native'

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.text.primary};
`

export const ErrorText = styled(Text)`
  color: #e7000b;
  font-size: 12px;
`
