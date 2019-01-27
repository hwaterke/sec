import React from 'react'
import PropTypes from 'prop-types'
import {select} from 'redux-crud-provider'
import moment from 'moment'
import {SectionList, View} from 'react-native'
import {connect} from 'react-redux'
import {globalStyles} from '../../constants/styles'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {
  workoutSetsByDaySelector,
  workoutSetsGroupedByDateExerciseSectionsSelector,
} from '../../selectors/workout_sets'
import {Info, InfoRow} from '../simple/Info'
import {extractUuid} from '../../constants/keyExtractor'
import {SectionHeader} from '../dumb/SectionHeader'
import {WorkoutSetResource} from '../../entities/WorkoutSetResource'
import {secondsToHuman} from '../screens/today/TimeSince'
import {isoDateToHuman} from '../../utils/dateUtils'
import {WorkoutSetRow} from './WorkoutSetRow'

const mapStateToProps = state => ({
  workoutSetsByDay: workoutSetsByDaySelector(state),
  workoutSetsGroupedByDateExerciseSections: workoutSetsGroupedByDateExerciseSectionsSelector(
    state
  ),
  exercisesById: select(ExerciseResource).byId(state),
})

@connect(mapStateToProps)
export class WorkoutSetsSummary extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
    workoutSetsByDay: PropTypes.objectOf(
      PropTypes.arrayOf(WorkoutSetResource.propType)
    ).isRequired,
    workoutSetsGroupedByDateExerciseSections: PropTypes.object.isRequired,
    exercisesById: PropTypes.objectOf(ExerciseResource.propType),
  }

  renderHeader = () => {
    const date = this.props.navigation.state.params.date
    const allSets = this.props.workoutSetsByDay[date]
    const timeEnd = moment(allSets[0].executed_at, 'YYYY-MM-DD HH:mm:ss')
    const timeStart = moment(
      allSets[allSets.length - 1].executed_at,
      'YYYY-MM-DD HH:mm:ss'
    )
    return (
      <View style={globalStyles.screen}>
        <InfoRow>
          <Info
            highlight={isoDateToHuman(date)}
            caption={secondsToHuman(
              moment.duration(timeEnd.diff(timeStart)).asSeconds()
            )}
          />
        </InfoRow>
        <InfoRow>
          <Info highlight={timeStart.format('HH:mm')} caption="START" />
          <Info highlight={timeEnd.format('HH:mm')} caption="END" />
        </InfoRow>
      </View>
    )
  }

  isEdit = () =>
    this.props.navigation.state.params &&
    this.props.navigation.state.params.edit

  onRowPress = workoutSet => {
    if (this.isEdit()) {
      this.props.navigation.navigate('WorkoutSetsEdit', {
        resourceId: workoutSet.uuid,
      })
    } else {
      this.props.navigation.navigate('WorkoutSetsAdd', {workoutSet})
    }
  }

  renderRow = ({item}) => (
    <WorkoutSetRow workoutSet={item} onPress={() => this.onRowPress(item)} />
  )

  render() {
    const {exercisesById} = this.props
    const date = this.props.navigation.state.params.date
    const daySets = this.props.workoutSetsGroupedByDateExerciseSections[date]

    if (!daySets) {
      return null
    }

    return (
      <View style={globalStyles.screen}>
        <SectionList
          sections={daySets}
          renderItem={this.renderRow}
          renderSectionHeader={({section}) => (
            <SectionHeader title={exercisesById[section.exerciseUuid].name} />
          )}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={extractUuid}
        />
      </View>
    )
  }
}
