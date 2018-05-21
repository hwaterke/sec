import React from 'react'
import PropTypes from 'prop-types'
import {ExercisesForm} from './ExercisesForm'
import {Screen} from '../dumb/Screen'
import {LoadingScreen} from '../dumb/LoadingScreen'
import {ExerciseProvider} from '../providers/ExerciseProvider'
import {getExercisesRef} from '../../utils/firestoreUtils'

export class ExercisesEditScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
  }

  updateResource = data => {
    const {resourceId} = this.props.navigation.state.params
    getExercisesRef()
      .doc(resourceId)
      .update(data)
      .then(this.props.navigation.goBack)
  }

  render() {
    const {resourceId} = this.props.navigation.state.params
    return (
      <ExerciseProvider exerciseId={resourceId}>
        {({exercise, isLoaded}) =>
          !isLoaded ? (
            <LoadingScreen />
          ) : (
            <Screen scroll padding>
              <ExercisesForm
                initialValues={exercise}
                handleSubmit={this.updateResource}
              />
            </Screen>
          )}
      </ExerciseProvider>
    )
  }
}
