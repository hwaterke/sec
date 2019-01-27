import React from 'react'
import {SectionList, Text} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {head} from 'ramda'
import moment from 'moment'
import styled from 'styled-components'
import {select} from 'redux-crud-provider'
import {WorkoutSetResource} from '../../../entities/WorkoutSetResource'
import {
  workoutSetsByDateDescSelector,
  workoutSetsGroupedByDateExerciseSectionsSelector,
} from '../../../selectors/workout_sets'
import {Screen} from '../../dumb/Screen'
import {SectionHeader} from '../../dumb/SectionHeader'
import {extractUuid} from '../../../constants/keyExtractor'
import {ExerciseResource} from '../../../entities/ExerciseResource'
import {WorkoutSetRow} from '../../summary/WorkoutSetRow'
import {TimeSince} from './TimeSince'

const Container = styled.View`
  padding: 8px;
  align-items: center;
`

const _TodayScreen = ({
  workoutSets,
  workoutSetsGroupedByDateExerciseSections,
  exercisesById,
  navigation,
}) => {
  const today = moment().format('YYYY-MM-DD')
  const todaySets = workoutSetsGroupedByDateExerciseSections[today]

  // eslint-disable-next-line react/prop-types
  const renderRow = ({item}) => (
    <WorkoutSetRow
      workoutSet={item}
      onPress={() => navigation.navigate('WorkoutSetsAdd', {workoutSet: item})}
    />
  )

  return (
    <Screen>
      <Container>
        <Text>Time since last set</Text>
        <TimeSince
          time={moment(head(workoutSets).executed_at, 'YYYY-MM-DD HH:mm:ss')}
        />
      </Container>

      {todaySets && (
        <SectionList
          sections={todaySets}
          renderItem={renderRow}
          renderSectionHeader={({section}) => (
            <SectionHeader title={exercisesById[section.exerciseUuid].name} />
          )}
          keyExtractor={extractUuid}
        />
      )}
    </Screen>
  )
}

_TodayScreen.propTypes = {
  workoutSets: PropTypes.arrayOf(WorkoutSetResource.propType).isRequired,
  workoutSetsGroupedByDateExerciseSections: PropTypes.object.isRequired,
  exercisesById: PropTypes.objectOf(ExerciseResource.propType),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  workoutSets: workoutSetsByDateDescSelector(state),
  workoutSetsGroupedByDateExerciseSections: workoutSetsGroupedByDateExerciseSectionsSelector(
    state
  ),
  exercisesById: select(ExerciseResource).byId(state),
})

export const TodayScreen = connect(mapStateToProps)(_TodayScreen)
