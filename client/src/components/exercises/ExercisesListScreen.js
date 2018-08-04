import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-native'
import {Screen} from '../dumb/Screen'
import {ExercisesList} from './ExercisesList'

export class ExercisesListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
  }

  isEdit = () =>
    this.props.navigation.state.params &&
    this.props.navigation.state.params.edit

  onRowPress = row => {
    if (this.isEdit()) {
      this.props.navigation.navigate('ExercisesEdit', {resourceId: row.uuid})
    } else {
      this.props.navigation.navigate('ExercisesDetail', {
        exercise_uuid: row.uuid,
      })
    }
  }

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
    )
  }
}
