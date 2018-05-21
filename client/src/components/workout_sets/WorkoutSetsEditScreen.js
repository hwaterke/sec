import React from 'react'
import PropTypes from 'prop-types'
import {byIdSelector} from 'hw-react-shared'
import {connect} from 'react-redux'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'
import {WorkoutSetsForm} from './WorkoutSetsForm'
import {Screen} from '../dumb/Screen'

@connect(state => ({workoutSetsById: byIdSelector(WorkoutSetResource)(state)}))
export class WorkoutSetsEditScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
    workoutSetsById: PropTypes.objectOf(WorkoutSetResource.propType).isRequired,
  }

  render() {
    const ws = this.props.workoutSetsById[
      this.props.navigation.state.params.resourceId
    ]

    return (
      <Screen scroll padding>
        <WorkoutSetsForm
          updatedResource={ws}
          postSubmit={() => this.props.navigation.goBack()}
          exercise_uuid={ws.exercise_uuid}
        />
      </Screen>
    )
  }
}
