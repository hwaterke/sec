import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native';
import {ExercisesList} from './ExercisesList';
import {Screen} from '../dumb/Screen';

export class ExercisesListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired
    }).isRequired
  };

  isEdit = () =>
    this.props.navigation.state.params &&
    this.props.navigation.state.params.edit;

  onRowPress = row => {
    if (this.isEdit()) {
      this.props.navigation.navigate('ExercisesEdit', {resourceId: row.id});
    } else {
      this.props.navigation.navigate('ExercisesDetail', {
        exercise_uuid: row.id
      });
    }
  };

  render() {
    return (
      <Screen>
        {this.isEdit() && (
          <Button
            title="Add"
            onPress={() => this.props.navigation.navigate('ExercisesAdd')}
          />
        )}
        <ExercisesList onRowPress={this.onRowPress} />
      </Screen>
    );
  }
}
