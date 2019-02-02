import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from '../../constants/colors'

const Container = styled.TouchableOpacity`
  padding: 12px;
  margin: 8px;
  border-radius: 24px;
  align-items: center;
  background-color: ${colors.headerColor};
`

const Text = styled.Text`
  color: white;
`

export const Button = ({onPress, children}) => (
  <Container onPress={onPress}>
    <Text>{children}</Text>
  </Container>
)

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}
