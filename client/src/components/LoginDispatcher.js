import React from 'react';
import {connect} from 'react-redux';
import {LoginScreen} from './LoginScreen';
import {ConnectedSecTabNavigator} from './ConnectedSecTabNavigator';

@connect(state => ({token: state.token}))
export class LoginDispatcher extends React.Component {

  static propTypes = {
    token: React.PropTypes.string
  };

  render() {
    if (this.props.token) {
      return <ConnectedSecTabNavigator />;
    }
    return <LoginScreen />;
  }
}
