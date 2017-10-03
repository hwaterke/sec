import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {toKilo} from '../../utils/conversion';
import {colors} from '../../constants/colors';
import {rubikText} from '../../constants/styles';
import {InfoRow} from '../simple/Info';

export class WorkoutSetMetrics extends React.Component {
  static propTypes = {
    workoutSet: WorkoutSetResource.propType.isRequired
  };

  render() {
    const set = this.props.workoutSet;

    return (
      <InfoRow>
        {set.repetitions != null && (
          <Text style={styles.text}>{set.repetitions}</Text>
        )}

        {set.weight != null && <Text style={styles.discretePush}>x</Text>}
        {set.weight != null && (
          <Text style={styles.text}>{toKilo(set.weight)}</Text>
        )}
        {set.weight != null && <Text style={styles.discretePushLeft}>kg</Text>}

        {set.time && <Text style={styles.discretePushRight}>{set.time}</Text>}

        {set.distance && (
          <Text style={styles.text}>{toKilo(set.distance)}</Text>
        )}
        {set.distance && <Text style={styles.discretePushLeft}>km</Text>}
      </InfoRow>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    ...rubikText
  },
  discretePushLeft: {
    ...rubikText,
    color: colors.discreteTextColor,
    paddingLeft: 4
  },
  discretePushRight: {
    ...rubikText,
    color: colors.discreteTextColor,
    paddingRight: 4
  },
  discretePush: {
    ...rubikText,
    color: colors.discreteTextColor,
    paddingHorizontal: 4
  }
});
