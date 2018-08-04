import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, TextInput} from 'react-native'

export class TextInputField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
  }

  render() {
    const {
      input: {value, onChange},
      // eslint-disable-next-line no-unused-vars
      meta,
      ...custom
    } = this.props
    return (
      <TextInput
        value={value}
        onChangeText={value => onChange(value)}
        style={styles.container}
        {...custom}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
})
