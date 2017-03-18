import React from 'react';
import {ScrollView} from 'react-native';
import {workoutSetsByDayAndExerciseSelector, workoutSetsByDaySelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {exercisesByIdSelector} from '../../selectors/exercices';
import {WorkoutSetMetrics} from '../workout_sets/WorkoutSetMetrics';
import {Text, Title, Screen, View} from '@shoutem/ui';
import moment from 'moment';
import {InfoRow, Info} from '../simple/Info';

const mapStateToProps = (state) => ({
  ws: workoutSetsByDayAndExerciseSelector(state),
  workoutSetsByDay: workoutSetsByDaySelector(state),
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
    const date = this.props.navigation.state.params.date;
    const workSets = this.props.ws[date];
    const allSets = this.props.workoutSetsByDay[date];
    const timeEnd = moment(allSets[0].executed_at, 'YYYY-MM-DD HH:mm:ss');
    const timeStart = moment(allSets[allSets.length - 1].executed_at, 'YYYY-MM-DD HH:mm:ss');

    return (
      <Screen>
        <ScrollView>

          <InfoRow>
            <Info highlight={date} caption={moment.duration(timeEnd.diff(timeStart)).humanize()} />
          </InfoRow>

          <InfoRow>
            <Info highlight={timeStart.format('HH:mm')} caption="START" />
            <Info highlight={timeEnd.format('HH:mm')} caption="END" />
          </InfoRow>

          {this.renderExercises(workSets)}
        </ScrollView>
      </Screen>
    );
  }
}
