import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {LoginScreen} from './LoginScreen'
import {SecTabNavigator} from './TabNavigator'

@connect(state => ({token: state.token}))
export class LoginDispatcher extends React.Component {
  static propTypes = {
    token: PropTypes.string,
  }

  render() {
    if (this.props.token) {
      return <SecTabNavigator />
    }
    return <LoginScreen />
  }
}
