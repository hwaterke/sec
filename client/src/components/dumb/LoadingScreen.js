import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {colors} from '../../constants/colors'

export class LoadingScreen extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.darkPrimaryColor} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
