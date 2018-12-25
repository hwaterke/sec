import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.View``

const Input = styled.TextInput`
  padding: 8px 16px;

  background-color: rgb(220, 225, 227);
  margin: 4px;

  border-radius: 12px;
`

export const SearchListHeader = ({value, onChangeText}) => (
  <Container>
    <Input
      value={value}
      placeholder="Search"
      clearButtonMode="while-editing"
      onChangeText={onChangeText}
    />
  </Container>
)

SearchListHeader.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
}
