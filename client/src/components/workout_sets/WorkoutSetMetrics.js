import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {toKilo} from '../../utils/conversion';
import {colors} from '../../constants/colors';

export class WorkoutSetMetrics extends React.Component {

  static propTypes = {
    workoutSet: WorkoutSetResource.propType.isRequired
  };

  render() {
    const set = this.props.workoutSet;

    return (
      <View style={styles.row}>
        {set.repetitions && <Text>{set.repetitions}</Text>}

        {set.weight && <Text style={styles.discretePush}>x</Text>}
        {set.weight && <Text>{toKilo(set.weight)}</Text>}
        {set.weight && <Text style={styles.discretePushLeft}>kg</Text>}

        {set.time && <Text style={styles.discretePushRight}>{set.time}</Text>}

        {set.distance && <Text>{toKilo(set.distance)}</Text>}
        {set.distance && <Text style={styles.discretePushLeft}>km</Text>}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discretePushLeft: {
    color: colors.discreteTextColor,
    paddingLeft: 4
  },
  discretePushRight: {
    color: colors.discreteTextColor,
    paddingRight: 4
  },
  discretePush: {
    color: colors.discreteTextColor,
    paddingHorizontal: 4
  }
});
