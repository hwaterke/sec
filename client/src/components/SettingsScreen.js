import React from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import {clearToken} from '../reducers/authentication'
import {Banner} from './simple/Banner'
import {SettingsResources} from './SettingsResources'
import {Screen} from './dumb/Screen'

@connect(state => ({
  backend: state.backend,
}))
export class SettingsScreen extends React.Component {
  static propTypes = {
    backend: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <Screen>
        <Banner />

        <View style={styles.box}>
          <Text>Logged in to {this.props.backend}</Text>
          <Button
            title="Sign out"
            onPress={() => {
              this.props.dispatch(clearToken())
              this.props.navigation.navigate('Auth')
            }}
          />
        </View>

        <SettingsResources />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})
