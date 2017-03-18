import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class InfoRow extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        {this.props.children}
      </View>
    );
  }
}

export class Info extends React.Component {

  static propTypes = {
    highlight: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string
  };

  render() {
    return (
      <View style={styles.info}>
        <Text style={styles.highlight}>{this.props.highlight}</Text>
        {
          this.props.caption &&
          <Text style={styles.caption}>{this.props.caption}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#eee'
  },
  highlight: {
    fontFamily: 'Rubik',
    fontSize: 26,
    color: '#333'
  },
  caption: {
    fontFamily: 'Rubik',
    fontSize: 12,
    color: '#888'
  }
});
