import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import moment from 'moment';
import {colors} from '../../constants/colors';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {Ionicons} from 'react-native-vector-icons';
import {WorkoutSetMetrics} from './WorkoutSetMetrics';

export class WorkoutSetsRow extends React.Component {

  static propTypes = {
    set: WorkoutSetResource.propType,
    exercise: React.PropTypes.object.isRequired,
    onPress: React.PropTypes.func
  };

  getTime(date) {
    return moment(date, 'YYYY-MM-DD HH:mm').format('HH:mm');
  }

  render() {
    const {set, exercise} = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.item}>
          <View style={styles.row}>
            {
              (set.busy || set.pendingCreate || set.pendingUpdate) &&
              <Ionicons
                name="ios-cloud-upload-outline"
                size={26}
                style={styles.icon}
              />
            }
            <Text style={styles.discretePushRight}>{this.getTime(set.executed_at)}</Text>
            <Text>{exercise.name}</Text>
          </View>
          <WorkoutSetMetrics workoutSet={set} />
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discretePushRight: {
    color: colors.discreteTextColor,
    paddingRight: 4
  },
  icon: {
    marginRight: 8
  }
});
