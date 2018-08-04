import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'react-native'
import {connect} from 'react-redux'
import {select} from 'redux-crud-provider'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {Screen} from '../dumb/Screen'
import {Title} from '../dumb/Title'

const mapStateToProps = state => ({
  exercicesById: select(ExerciseResource).byId(state),
})

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
  }

  render() {
    const exercise_uuid = this.props.navigation.state.params.exercise_uuid
    const exercise = this.props.exercicesById[exercise_uuid]

    return (
      <Screen>
        <Button
          title="Add"
          onPress={() =>
            this.props.navigation.navigate('WorkoutSetsAdd', {exercise_uuid})
          }
        />
        <Title>{exercise.name}</Title>
      </Screen>
    )
  }
}
