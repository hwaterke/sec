import React from 'react';
import PropTypes from 'prop-types';
import {WorkoutSetsForm} from './WorkoutSetsForm';
import {lastWorkoutSetByExerciseSelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {Screen} from '../dumb/Screen';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';

const mapStateToProps = state => ({
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsAddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired
    }).isRequired,
    lastWorkoutSetByExercise: PropTypes.objectOf(WorkoutSetResource.propType)
      .isRequired
  };

  getTemplate() {
    const params = this.props.navigation.state.params;
    if (params) {
      if (params.workoutSet) {
        return params.workoutSet;
      }
      if (params.exercise_uuid) {
        return Object.assign(
          {exercise_uuid: params.exercise_uuid},
          this.props.lastWorkoutSetByExercise[params.exercise_uuid]
        );
      }
    }
    return null;
  }

  render() {
    const template = this.getTemplate();

    return (
      <Screen scroll padding>
        <WorkoutSetsForm
          postSubmit={() => this.props.navigation.goBack()}
          exercise_uuid={template.exercise_uuid}
          templateResource={template}
        />
      </Screen>
    );
  }
}
