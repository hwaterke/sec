import React from 'react';
import {Screen} from '@shoutem/ui';
import WorkoutSetsForm from './WorkoutSetsForm';
import {lastWorkoutSetByExerciseSelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsAddScreen extends React.Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      goBack: React.PropTypes.func.isRequired,
      state: React.PropTypes.object.isRequired
    }).isRequired
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
      <Screen>
        <WorkoutSetsForm
          postSubmit={() => this.props.navigation.goBack()}
          exercise_uuid={template.exercise_uuid}
          templateResource={template}
        />
      </Screen>
    );
  }
}
