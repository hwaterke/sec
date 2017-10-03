import {byIdSelector} from 'hw-react-shared';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {ExercisesForm} from './ExercisesForm';
import {Screen} from '../dumb/Screen';

@connect(state => ({exercises: byIdSelector(ExerciseResource)(state)}))
export class ExercisesEditScreen extends React.Component {
  static propTypes = {
    exercises: PropTypes.objectOf(ExerciseResource.propType).isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    return (
      <Screen scroll padding>
        <ExercisesForm
          updatedResource={
            this.props.exercises[this.props.navigation.state.params.resourceId]
          }
          postSubmit={() => this.props.navigation.goBack()}
        />
      </Screen>
    );
  }
}
