import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Banner} from './simple/Banner';
import firebase from 'firebase';
import {SettingsResources} from './SettingsResources';
import {Screen} from './dumb/Screen';
import {firebaseConfig} from '../constants/firebase';

export class SettingsScreen extends React.Component {
  render() {
    return (
      <Screen>
        <Banner />

        <View style={styles.box}>
          <Text>Logged in to {firebaseConfig.authDomain}</Text>
          <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        </View>

        <SettingsResources />
      </Screen>
    );
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
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
