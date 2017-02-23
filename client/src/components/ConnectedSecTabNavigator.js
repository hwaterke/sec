import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {SecTabNavigator} from './TabNavigator';

// Connecting the TabNavigation to Redux
export const ConnectedSecTabNavigator = connect(
  state => ({nav: state.navigation}))(({dispatch, nav}) => (
  <SecTabNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
));
