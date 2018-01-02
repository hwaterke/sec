import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

const style = StyleSheet.create({
  topBar: {
    height: 24,
    backgroundColor: 'blue'
  }
});

export const TopBar = () =>
  Platform.OS === 'ios' ? null : <View style={style.topBar} />;
