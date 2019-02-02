import React from 'react'
import {SectionList, Text} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {flatten, head, identity, uniq} from 'ramda'
import moment from 'moment'
import styled from 'styled-components'
import {select} from 'redux-crud-provider'
import {WorkoutSetResource} from '../../../entities/WorkoutSetResource'
import {
  workoutSetsByDateDescSelector,
  workoutSetsByDaySelector,
  workoutSetsGroupedByDateExerciseSectionsSelector,
} from '../../../selectors/workout_sets'
import {Screen} from '../../dumb/Screen'
import {SectionHeader} from '../../dumb/SectionHeader'
import {extractUuid} from '../../../constants/keyExtractor'
import {ExerciseResource} from '../../../entities/ExerciseResource'
import {WorkoutSetRow} from '../../summary/WorkoutSetRow'
import {exercisesGroupedByMuscleSelector} from '../../../selectors/exercises'
import {TimeSince} from './TimeSince'
import {ExerciseSuggestion} from './ExerciseSuggestion'

const Container = styled.View`
  padding: 8px;
  align-items: center;
`

const _TodayScreen = ({
  workoutSets,
  workoutSetsByDay,
  workoutSetsGroupedByDateExerciseSections,
  exercisesById,
  exercisesGroupedByMuscle,
  navigation,
}) => {
  const today = moment().format('YYYY-MM-DD')
  const todaySets = workoutSetsGroupedByDateExerciseSections[today]

  const todayExercises = uniq(
    (workoutSetsByDay[today] || []).map(s => s.exercise_uuid)
  )

  const todayMuscles = uniq(
    todayExercises.map(uuid => exercisesById[uuid].main_muscle).filter(identity)
  )

  // Some exercises for the same muscles
  const exercisesSuggestions = flatten(
    todayMuscles.map(m => exercisesGroupedByMuscle[m])
  )
    .map(e => e.uuid)
    .filter(eUuid => !todayExercises.includes(eUuid))

  // eslint-disable-next-line react/prop-types
  const renderRow = ({item, section}) =>
    section.title === 'Suggestions' ? (
      <ExerciseSuggestion
        exerciseUuid={item}
        onPress={() =>
          navigation.navigate('ExercisesDetail', {
            exercise_uuid: item,
          })
        }
      />
    ) : (
      <WorkoutSetRow
        workoutSet={item}
        onPress={() =>
          navigation.navigate('WorkoutSetsAdd', {workoutSet: item})
        }
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
          sections={[
            {title: 'Suggestions', data: exercisesSuggestions},
            ...todaySets,
          ]}
          renderItem={renderRow}
          renderSectionHeader={({section}) => (
            <SectionHeader
              title={
                section.title === 'Suggestions'
                  ? section.title
                  : exercisesById[section.exerciseUuid].name
              }
            />
          )}
          keyExtractor={extractUuid}
        />
      )}
    </Screen>
  )
}

_TodayScreen.propTypes = {
  workoutSets: PropTypes.arrayOf(WorkoutSetResource.propType).isRequired,
  workoutSetsByDay: PropTypes.objectOf(
    PropTypes.arrayOf(WorkoutSetResource.propType).isRequired
  ).isRequired,
  workoutSetsGroupedByDateExerciseSections: PropTypes.object.isRequired,
  exercisesById: PropTypes.objectOf(ExerciseResource.propType),
  exercisesGroupedByMuscle: PropTypes.objectOf(
    PropTypes.arrayOf(ExerciseResource.propType).isRequired
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  workoutSets: workoutSetsByDateDescSelector(state),
  workoutSetsByDay: workoutSetsByDaySelector(state),
  workoutSetsGroupedByDateExerciseSections: workoutSetsGroupedByDateExerciseSectionsSelector(
    state
  ),
  exercisesById: select(ExerciseResource).byId(state),
  exercisesGroupedByMuscle: exercisesGroupedByMuscleSelector(state),
})

export const TodayScreen = connect(mapStateToProps)(_TodayScreen)
