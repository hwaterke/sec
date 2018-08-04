import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'

export class InfoRow extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return <View style={styles.row}>{this.props.children}</View>
  }
}

export class Info extends React.Component {
  static propTypes = {
    highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    caption: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.info}>
        <Text style={styles.highlight}>{this.props.highlight}</Text>
        {this.props.caption && (
          <Text style={styles.caption}>{this.props.caption}</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  highlight: {
    fontSize: 26,
    color: '#333',
  },
  caption: {
    fontSize: 12,
    color: '#888',
  },
})
