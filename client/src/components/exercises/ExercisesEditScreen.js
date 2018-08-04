import PropTypes from 'prop-types'
import React from 'react'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {ResourceFormProvider} from '../../providers/ResourceFormProvider'
import {crudThunks} from '../../thunks/crudThunks'
import {Screen} from '../dumb/Screen'
import {ExercisesForm} from './ExercisesForm'

export class ExercisesEditScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <Screen scroll padding>
        <ResourceFormProvider
          crudThunks={crudThunks}
          uuid={this.props.navigation.state.params.resourceId}
          resource={ExerciseResource}
          postAction={() => this.props.navigation.goBack()}
        >
          {props => <ExercisesForm {...props} />}
        </ResourceFormProvider>
      </Screen>
    )
  }
}
