import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {workoutSetsByDayAndExerciseSelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {globalStyles} from '../../constants/styles';
import {Banner} from '../simple/Banner';
import {Title} from '../simple/Title';
import {exercisesByIdSelector} from '../../selectors/exercices';
import {WorkoutSetMetrics} from './WorkoutSetMetrics';

const mapStateToProps = (state) => ({
  ws: workoutSetsByDayAndExerciseSelector(state),
  exercisesById: exercisesByIdSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsSummary extends React.Component {
  renderSets = (sets) => (
    <View style={styles.repsView}>
      {sets.map(ws => (
        <WorkoutSetMetrics key={ws.uuid} workoutSet={ws} />
      ))}
    </View>
  );

  renderExercises = (exercises) => {
    return (
      <View style={styles.card}>
        {Object.keys(exercises).map(exercise_uuid =>
          <View key={exercise_uuid} style={styles.exerciseView}>
            <Text>{this.props.exercisesById[exercise_uuid].name}</Text>
            {this.renderSets(exercises[exercise_uuid])}
          </View>
        )}
      </View>
    );
  };

  render() {
    const {ws} = this.props;
    return (
      <View style={globalStyles.flexContainer}>
        <Banner />
        <ScrollView style={styles.container}>
          {Object.keys(ws).map(day =>
            <View key={day}>
              <Title content={day} />
              {this.renderExercises(ws[day])}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa'
  },
  card: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  exerciseView: {
    marginVertical: 8
  },
  repsView: {
    marginHorizontal: 12,
    marginVertical: 4
  }
});
