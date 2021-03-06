import React from 'react'
import PropTypes from 'prop-types'
import {Screen} from '../dumb/Screen'
import {Button} from '../dumb/Button'
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
            onPress={() => this.props.navigation.navigate('ExercisesAdd')}
          >
            Add
          </Button>
        )}
        <ExercisesList onRowPress={this.onRowPress} />
      </Screen>
    )
  }
}
