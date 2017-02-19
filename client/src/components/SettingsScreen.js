import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Banner} from './simple/Banner';
import {SettingsBackendForm} from './SettingsBackendForm';
import {Title} from './simple/Title';
import {JsonDebug} from './simple/JsonDebug';
import {globalStyles} from '../constants/styles';

@connect(state => ({fullState: state}))
export class SettingsScreen extends React.Component {

  static propTypes = {
    fullState: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <Banner />
        <SettingsBackendForm />
        <Title content="Store" />
        <JsonDebug value={this.props.fullState} />
      </View>
    );
  }
}
