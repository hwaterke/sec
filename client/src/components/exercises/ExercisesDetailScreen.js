import React from 'react';
import PropTypes from 'prop-types';
import {Button, View} from 'react-native';
import {Screen} from '../dumb/Screen';
import {connect} from 'react-redux';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {byIdSelector} from 'hw-react-shared';
import {Title} from '../dumb/Title';
import {workoutSetsByExercise} from '../../selectors/workout_sets';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import {colors} from '../../constants/colors';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import moment from 'moment';

const mapStateToProps = state => ({
  exercicesById: byIdSelector(ExerciseResource)(state),
  workoutSetsByExercise: workoutSetsByExercise(state)
});

@connect(mapStateToProps)
export class ExercisesDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          exercise_uuid: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    exercicesById: PropTypes.objectOf(ExerciseResource.propType).isRequired,
    workoutSetsByExercise: PropTypes.objectOf(
      PropTypes.arrayOf(WorkoutSetResource.propType).isRequired
    ).isRequired
  };

  render() {
    const exercise_uuid = this.props.navigation.state.params.exercise_uuid;
    const exercise = this.props.exercicesById[exercise_uuid];
    const workoutSets = this.props.workoutSetsByExercise[exercise_uuid];

    return (
      <Screen>
        <Button
          title="Add"
          onPress={() =>
            this.props.navigation.navigate('WorkoutSetsAdd', {exercise_uuid})}
        />
        <Title>{exercise.name}</Title>

        {exercise.weight &&
          workoutSets && (
            <View>
              <Title>Weight</Title>
              <VictoryChart>
                <VictoryLine
                  style={{
                    data: {
                      stroke: colors.headerColor,
                      strokeWidth: 3
                    }
                  }}
                  padding={20}
                  data={workoutSets}
                  x={d => moment(d.executed_at, 'YYYY-MM-DD').unix()}
                  y={d => d.weight / 1000}
                />
                <VictoryAxis dependentAxis />
              </VictoryChart>
            </View>
          )}
      </Screen>
    );
  }
}
