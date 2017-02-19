import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import moment from 'moment';
import {toKilo} from '../../utils/conversion';
import {colors} from '../../constants/colors';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {Ionicons} from 'react-native-vector-icons';

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
          <View style={styles.row}>
            {set.repetitions && <Text>{set.repetitions}</Text>}

            {set.weight && <Text style={styles.discretePush}>x</Text>}
            {set.weight && <Text>{toKilo(set.weight)}</Text>}
            {set.weight && <Text style={styles.discretePushLeft}>kg</Text>}

            {set.time && <Text style={styles.discretePushRight}>{set.time}</Text>}

            {set.distance && <Text>{toKilo(set.distance)}</Text>}
            {set.distance && <Text style={styles.discretePushLeft}>km</Text>}
          </View>
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
  discrete: {
    color: colors.discreteTextColor,
  },
  discretePushRight: {
    color: colors.discreteTextColor,
    paddingRight: 4
  },
  discretePushLeft: {
    color: colors.discreteTextColor,
    paddingLeft: 4
  },
  discretePush: {
    color: colors.discreteTextColor,
    paddingHorizontal: 4
  },
  icon: {
    marginRight: 8
  }
});
