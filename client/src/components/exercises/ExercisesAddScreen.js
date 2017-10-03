import React from 'react';
import PropTypes from 'prop-types';
import {ExercisesForm} from './ExercisesForm';
import {Screen} from '../dumb/Screen';

export class ExercisesAddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    return (
      <Screen scroll padding>
        <ExercisesForm postSubmit={() => this.props.navigation.goBack()} />
      </Screen>
    );
  }
}
