import React from 'react'
import {LoginScreen} from './LoginScreen'
import {SecTabNavigator} from './TabNavigator'
import firebase from 'firebase'

export class LoginDispatcher extends React.Component {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loggedIn: !!user,
      })
    })
  }

  render() {
    if (this.state.loggedIn) {
      return <SecTabNavigator />
    }
    return <LoginScreen />
  }
}
