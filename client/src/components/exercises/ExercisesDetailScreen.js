import React from 'react'
import PropTypes from 'prop-types'
import {Button, View} from 'react-native'
import {Screen} from '../dumb/Screen'
import {connect} from 'react-redux'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {byIdSelector} from 'hw-react-shared'
import {Title} from '../dumb/Title'
import {workoutSetsByExercise} from '../../selectors/workout_sets'
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native'
import {colors} from '../../constants/colors'
import {DateTime} from 'luxon'
import {ExerciseProvider} from '../providers/ExerciseProvider'
import {LoadingScreen} from '../dumb/LoadingScreen'
import {WorkoutsForExerciseProvider} from '../providers/WorkoutsForExerciseProvider'

const mapStateToProps = state => ({
  exercicesById: byIdSelector(ExerciseResource)(state),
  workoutSetsByExercise: workoutSetsByExercise(state),
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
  }

  render() {
    const exercise_uuid = this.props.navigation.state.params.exercise_uuid

    return (
      <ExerciseProvider exerciseId={exercise_uuid}>
        {({exercise, isLoaded}) =>
          !isLoaded ? (
            <LoadingScreen />
          ) : (
            <Screen>
              <Button
                title="Add"
                onPress={() =>
                  this.props.navigation.navigate('WorkoutSetsAdd', {
                    exercise_uuid,
                  })}
              />
              <Title>{exercise.name}</Title>
              {exercise.weight && (
                <WorkoutsForExerciseProvider exerciseId={exercise_uuid}>
                  {({isLoaded, sets}) =>
                    /** Help needed here to make this work **/
                    false &&
                    isLoaded && (
                      <View>
                        <Title>Weight</Title>
                        <VictoryChart>
                          <VictoryLine
                            style={{
                              data: {
                                stroke: colors.headerColor,
                                strokeWidth: 3,
                              },
                            }}
                            padding={20}
                            data={sets}
                            x={d => DateTime.fromISO(d.executed_at).ts}
                            y={d => d.weight / 1000}
                          />
                          <VictoryAxis dependentAxis />
                        </VictoryChart>
                      </View>
                    )}
                </WorkoutsForExerciseProvider>
              )}
            </Screen>
          )}
      </ExerciseProvider>
    )
  }
}
