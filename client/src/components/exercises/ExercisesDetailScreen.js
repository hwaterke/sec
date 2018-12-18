import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {Button} from 'react-native'
import {connect} from 'react-redux'
import {select} from 'redux-crud-provider'
import {descend, pipe, prop, sortWith, take, uniqBy} from 'ramda'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {Screen} from '../dumb/Screen'
import {Title} from '../dumb/Title'
import {workoutSetsByExercise} from '../../selectors/workout_sets'
import {WorkoutSetRow} from '../summary/WorkoutSetRow'
import {SectionHeader} from '../dumb/SectionHeader'

const mapStateToProps = state => ({
  exercicesById: select(ExerciseResource).byId(state),
  workoutSetsByExercise: workoutSetsByExercise(state),
})

const sortByDateDesc = sortWith([descend(prop('executed_at'))])

const hash = ws => [ws.repetitions, ws.weight, ws.time, ws.distance].join('-')

const withoutDuplicates = sets => {
  if (!sets) {
    return []
  }

  return pipe(
    sortByDateDesc,
    uniqBy(hash),
    take(15)
  )(sets)
}

@connect(mapStateToProps)
export class ExercisesDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          exercise_uuid: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    exercicesById: PropTypes.objectOf(ExerciseResource.propType).isRequired,
    workoutSetsByExercise: PropTypes.object.isRequired,
  }

  onClick = workoutSet => {
    this.props.navigation.navigate('WorkoutSetsAdd', {workoutSet})
  }

  render() {
    const exercise_uuid = this.props.navigation.state.params.exercise_uuid
    const exercise = this.props.exercicesById[exercise_uuid]
    const sets = withoutDuplicates(
      this.props.workoutSetsByExercise[exercise_uuid]
    )

    return (
      <Screen scroll>
        <Button
          title="Add"
          onPress={() =>
            this.props.navigation.navigate('WorkoutSetsAdd', {exercise_uuid})
          }
        />
        <Title>{exercise.name}</Title>

        {sets && (
          <Fragment>
            <SectionHeader title="History" />

            {sets.map(ws => (
              <WorkoutSetRow
                key={ws.uuid}
                workoutSet={ws}
                onPress={() => this.onClick(ws)}
                fullDate
              />
            ))}
          </Fragment>
        )}
      </Screen>
    )
  }
}
