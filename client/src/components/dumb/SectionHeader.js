import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Platform} from 'react-native'
import {colors} from '../../constants/colors'

export class SectionHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerColor,
  },

  text: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Medium' : 'normal',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
  },
})
