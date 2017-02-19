import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ExerciseResource} from '../../entities/ExerciseResource';

export class ExerciseRow extends React.Component {

  static propTypes = {
    item: ExerciseResource.propType,
    onPress: React.PropTypes.func
  };

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.item}>
          <Text>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  }
});
