import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Banner} from './simple/Banner';
import {globalStyles} from '../constants/styles';
import {clearToken} from '../reducers/authentication';
import {api} from '../api/api';
import {SettingsResources} from './SettingsResources';

@api()
@connect(state => ({
  backend: state.backend
}))
export class SettingsScreen extends React.Component {

  static propTypes = {
    backend: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    fetchAll: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <Banner />

        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Logged in to {this.props.backend}</Text>
            <Button
              title="Sign out"
              onPress={() => this.props.dispatch(clearToken())}
            />
          </View>

          <SettingsResources />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  box: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});

