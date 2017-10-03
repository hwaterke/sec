import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

export class Row extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
