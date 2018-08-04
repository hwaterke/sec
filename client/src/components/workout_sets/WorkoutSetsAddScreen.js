import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'
import {ResourceFormProvider} from '../../providers/ResourceFormProvider'
import {lastWorkoutSetByExerciseSelector} from '../../selectors/workout_sets'
import {crudThunks} from '../../thunks/crudThunks'
import {Screen} from '../dumb/Screen'
import {
  WorkoutSetsForm,
  workoutSetsFormToResource,
  workoutSetsResourceToForm,
} from './WorkoutSetsForm'

const mapStateToProps = state => ({
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state),
})

@connect(mapStateToProps)
export class WorkoutSetsAddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
    lastWorkoutSetByExercise: PropTypes.objectOf(WorkoutSetResource.propType)
      .isRequired,
  }

  getTemplate() {
    const params = this.props.navigation.state.params
    if (params) {
      if (params.workoutSet) {
        return params.workoutSet
      }
      if (params.exercise_uuid) {
        return Object.assign(
          {exercise_uuid: params.exercise_uuid},
          this.props.lastWorkoutSetByExercise[params.exercise_uuid]
        )
      }
    }
    return null
  }

  render() {
    const template = this.getTemplate()

    return (
      <Screen scroll padding>
        <ResourceFormProvider
          crudThunks={crudThunks}
          resource={WorkoutSetResource}
          formToResource={workoutSetsFormToResource}
          resourceToForm={workoutSetsResourceToForm}
          templateResource={template}
          postAction={() => this.props.navigation.goBack()}
        >
          {props => (
            <WorkoutSetsForm
              {...props}
              exercise_uuid={template.exercise_uuid}
            />
          )}
        </ResourceFormProvider>
      </Screen>
    )
  }
}
