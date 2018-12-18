import React from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import styled from 'styled-components'
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'
import {colors} from '../../constants/colors'
import {WorkoutSetMetrics} from '../workout_sets/WorkoutSetMetrics'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'

const Row = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  background-color: white;
  border-color: ${colors.borderColor};
  border-bottom-width: ${StyleSheet.hairlineWidth};
`

const formatTime = date => moment(date, 'YYYY-MM-DD HH:mm').format('HH:mm')

export const WorkoutSetRow = ({onPress, workoutSet}) => (
  <TouchableOpacity onPress={onPress}>
    <Row>
      {(workoutSet.busy ||
        workoutSet.pendingCreate ||
        workoutSet.pendingUpdate) && (
        <View style={{flex: 1}}>
          <Ionicons name="ios-cloud-upload" size={26} />
        </View>
      )}
      <View style={{flex: 1}}>
        <Text style={{color: colors.discreteTextColor}}>
          {formatTime(workoutSet.executed_at)}
        </Text>
      </View>
      <View style={{flex: 4}}>
        <WorkoutSetMetrics workoutSet={workoutSet} />
      </View>
    </Row>
  </TouchableOpacity>
)

WorkoutSetRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  workoutSet: WorkoutSetResource.propType.isRequired,
}
