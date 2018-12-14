import React from 'react'
import {ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Screen} from './dumb/Screen'

@connect(state => ({token: state.token}))
export class AuthLoadingScreen extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    this.props.navigation.navigate(this.props.token ? 'App' : 'Auth')
  }

  render() {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }
}
