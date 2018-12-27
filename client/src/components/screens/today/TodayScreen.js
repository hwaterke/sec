import React from 'react'
import {Text} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {head} from 'ramda'
import moment from 'moment'
import styled from 'styled-components'
import {WorkoutSetResource} from '../../../entities/WorkoutSetResource'
import {workoutSetsByDateSelector} from '../../../selectors/workout_sets'
import {Screen} from '../../dumb/Screen'
import {TimeSince} from './TimeSince'

const Container = styled.View`
  align-items: center;
`

const _TodayScreen = ({workoutSets}) => (
  <Screen padding>
    <Container>
      <Text>Time since last set</Text>
      <TimeSince
        time={moment(head(workoutSets).executed_at, 'YYYY-MM-DD HH:mm:ss')}
      />
    </Container>
  </Screen>
)

_TodayScreen.propTypes = {
  workoutSets: PropTypes.arrayOf(WorkoutSetResource.propType).isRequired,
}

const mapStateToProps = state => ({
  workoutSets: workoutSetsByDateSelector(state),
})

export const TodayScreen = connect(mapStateToProps)(_TodayScreen)
