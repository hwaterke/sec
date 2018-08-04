import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text} from 'react-native'

export class Title extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return <Text style={styles.text}>{this.props.children}</Text>
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    color: '#333',
    marginBottom: 8,
  },
})
