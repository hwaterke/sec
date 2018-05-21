import React from 'react'
import PropTypes from 'prop-types'
import {byIdSelector} from 'hw-react-shared'
import R from 'ramda'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {globalStyles} from '../../constants/styles'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {displayNameOfExercise} from '../../selectors/exercices'
import {workoutSetsByDaySelector} from '../../selectors/workout_sets'
import {Ionicons} from '@expo/vector-icons'
import {Row} from '../dumb/Row'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'

const mapStateToProps = state => ({
  exercises: byIdSelector(ExerciseResource)(state),
  workoutSetsByDay: workoutSetsByDaySelector(state),
})

@connect(mapStateToProps)
export class SummaryListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
    exercises: PropTypes.objectOf(ExerciseResource.propType).isRequired,
    workoutSetsByDay: PropTypes.objectOf(
      PropTypes.arrayOf(WorkoutSetResource.propType)
    ).isRequired,
  }

  renderRow = ({item}) => {
    const muscle = this.mainMuscleIn(this.props.workoutSetsByDay[item])

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Summary', {date: item})}
      >
        <Row>
          <Text>{item}</Text>
          <Text>{muscle}</Text>
          <Ionicons name="ios-arrow-forward" />
        </Row>
      </TouchableOpacity>
    )
  }

  mainMuscleIn = workoutSets => {
    const exercices = R.map(ws => this.props.exercises[ws.exercise_uuid])(
      workoutSets
    )
    const muscleCountObject = R.countBy(displayNameOfExercise)(exercices)
    const sortedMuscle = R.sortBy(R.prop(1))(R.toPairs(muscleCountObject))
    return R.last(sortedMuscle)[0]
  }

  render() {
    return (
      <View style={globalStyles.screen}>
        <FlatList
          data={Object.keys(this.props.workoutSetsByDay)}
          renderItem={this.renderRow}
          keyExtractor={item => item}
        />
      </View>
    )
  }
}
