import {Ionicons} from '@expo/vector-icons'
import PropTypes from 'prop-types'
import {countBy, last, map, prop, sortBy, toPairs} from 'ramda'
import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {select} from 'redux-crud-provider'
import {globalStyles} from '../../constants/styles'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'
import {displayNameOfExercise} from '../../selectors/exercises'
import {workoutSetsByDaySelector} from '../../selectors/workout_sets'
import {Row} from '../dumb/Row'
import {isoDateToHuman} from '../../utils/dateUtils'

const mapStateToProps = state => ({
  exercises: select(ExerciseResource).byId(state),
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
          <Text>{isoDateToHuman(item)}</Text>
          <Text>{muscle}</Text>
          <Ionicons name="ios-arrow-forward" />
        </Row>
      </TouchableOpacity>
    )
  }

  mainMuscleIn = workoutSets => {
    const exercices = map(ws => this.props.exercises[ws.exercise_uuid])(
      workoutSets
    )
    const muscleCountObject = countBy(displayNameOfExercise)(exercices)
    const sortedMuscle = sortBy(prop(1))(toPairs(muscleCountObject))
    return last(sortedMuscle)[0]
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
