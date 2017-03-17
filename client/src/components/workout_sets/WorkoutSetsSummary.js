import React from 'react';
import {ScrollView} from 'react-native';
import {workoutSetsByDayAndExerciseSelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {Banner} from '../simple/Banner';
import {exercisesByIdSelector} from '../../selectors/exercices';
import {WorkoutSetMetrics} from './WorkoutSetMetrics';
import {Text, Caption, Divider, Screen, View} from '@shoutem/ui';

const mapStateToProps = (state) => ({
  ws: workoutSetsByDayAndExerciseSelector(state),
  exercisesById: exercisesByIdSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsSummary extends React.Component {
  renderSets = (sets) => (
    <View styleName="sm-gutter">
      {sets.map(ws => (
        <WorkoutSetMetrics key={ws.uuid} workoutSet={ws} />
      ))}
    </View>
  );

  renderExercises = (exercises) => {
    return (
      <View styleName="md-gutter" style={{backgroundColor: 'white'}}>
        {Object.keys(exercises).map(exercise_uuid =>
          <View key={exercise_uuid} styleName="sm-gutter">
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
      <Screen>
        <Banner />
        <ScrollView>
          {Object.keys(ws).map(day =>
            <View key={day}>
              <Divider styleName="section-header">
                <Caption>{day}</Caption>
              </Divider>
              {this.renderExercises(ws[day])}
            </View>
          )}
        </ScrollView>
      </Screen>
    );
  }
}
