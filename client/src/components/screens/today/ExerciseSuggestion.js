import React from 'react'
import {StyleSheet, Text} from 'react-native'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {select} from 'redux-crud-provider'
import {colors} from '../../../constants/colors'
import {daysSince} from '../../../utils/dateUtils'
import {ExerciseResource} from '../../../entities/ExerciseResource'
import {WorkoutSetResource} from '../../../entities/WorkoutSetResource'
import {lastWorkoutSetByExerciseSelector} from '../../../selectors/workout_sets'
import {WorkoutSetMetrics} from '../../workout_sets/WorkoutSetMetrics'

const Row = styled.TouchableOpacity`
  padding: 8px;
  background-color: white;
  border-color: ${colors.borderColor};
  border-bottom-width: ${StyleSheet.hairlineWidth};
`

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DiscreteText = styled.Text`
  color: ${colors.discreteTextColor};
`

const Tag = styled.View`
  padding: 2px 8px;

  background-color: ${colors.headerColor};
  border-radius: 8px;
`

const TagText = styled.Text`
  color: white;
`

export const _ExerciseSuggestion = ({exercise, lastWorkoutSet, onPress}) => (
  <Row onPress={onPress}>
    <Text>{exercise.name}</Text>

    <BottomRow>
      <DiscreteText>{exercise.main_muscle}</DiscreteText>

      {lastWorkoutSet && <WorkoutSetMetrics workoutSet={lastWorkoutSet} />}

      {lastWorkoutSet && (
        <Tag>
          <TagText>{daysSince(lastWorkoutSet.executed_at)} days</TagText>
        </Tag>
      )}
    </BottomRow>
  </Row>
)

_ExerciseSuggestion.propTypes = {
  exercise: ExerciseResource.propType.isRequired,
  lastWorkoutSet: WorkoutSetResource.propType,
  onPress: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  exercise: select(ExerciseResource).byId(state)[ownProps.exerciseUuid],
  lastWorkoutSet: lastWorkoutSetByExerciseSelector(state)[
    ownProps.exerciseUuid
  ],
})

export const ExerciseSuggestion = connect(mapStateToProps)(_ExerciseSuggestion)

ExerciseSuggestion.propTypes = {
  exerciseUuid: PropTypes.string.isRequired,
}
