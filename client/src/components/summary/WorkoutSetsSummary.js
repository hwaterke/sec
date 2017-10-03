import React from 'react';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import {byIdSelector} from 'hw-react-shared';
import moment from 'moment';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../constants/styles';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {
  workoutSetsByDayAndExerciseSelector,
  workoutSetsByDayByExerciseSectionsSelector,
  workoutSetsByDaySelector
} from '../../selectors/workout_sets';
import {Info, InfoRow} from '../simple/Info';
import {WorkoutSetMetrics} from '../workout_sets/WorkoutSetMetrics';
import {extractUuid} from '../../constants/keyExtractor';
import {SectionHeader} from '../dumb/SectionHeader';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';

const mapStateToProps = state => ({
  ws: workoutSetsByDayAndExerciseSelector(state),
  workoutSetsByDay: workoutSetsByDaySelector(state),
  workoutSetsByDayByExerciseSections: workoutSetsByDayByExerciseSectionsSelector(
    state
  ),
  exercisesById: byIdSelector(ExerciseResource)(state)
});

@connect(mapStateToProps)
export class WorkoutSetsSummary extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired
    }).isRequired,
    workoutSetsByDay: PropTypes.objectOf(
      PropTypes.arrayOf(WorkoutSetResource.propType)
    ).isRequired,
    workoutSetsByDayByExerciseSections: PropTypes.object.isRequired
  };

  renderHeader = () => {
    const date = this.props.navigation.state.params.date;
    const allSets = this.props.workoutSetsByDay[date];
    const timeEnd = moment(allSets[0].executed_at, 'YYYY-MM-DD HH:mm:ss');
    const timeStart = moment(
      allSets[allSets.length - 1].executed_at,
      'YYYY-MM-DD HH:mm:ss'
    );
    return (
      <View style={globalStyles.screen}>
        <InfoRow>
          <Info
            highlight={date}
            caption={moment.duration(timeEnd.diff(timeStart)).humanize()}
          />
        </InfoRow>
        <InfoRow>
          <Info highlight={timeStart.format('HH:mm')} caption="START" />
          <Info highlight={timeEnd.format('HH:mm')} caption="END" />
        </InfoRow>
      </View>
    );
  };

  getTime(date) {
    return moment(date, 'YYYY-MM-DD HH:mm').format('HH:mm');
  }

  isEdit = () =>
    this.props.navigation.state.params &&
    this.props.navigation.state.params.edit;

  onRowPress = workoutSet => {
    if (this.isEdit()) {
      this.props.navigation.navigate('WorkoutSetsEdit', {
        resourceId: workoutSet.uuid
      });
    } else {
      this.props.navigation.navigate('WorkoutSetsAdd', {workoutSet});
    }
  };

  renderRow = ({item}) => (
    <TouchableOpacity onPress={() => this.onRowPress(item)}>
      <View style={styles.smallRow}>
        {(item.busy || item.pendingCreate || item.pendingUpdate) && (
          <View style={{flex: 1}}>
            <Ionicons
              name="ios-cloud-upload-outline"
              size={26}
              style={styles.icon}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <Text style={{color: colors.discreteTextColor}}>
            {this.getTime(item.executed_at)}
          </Text>
        </View>
        <View style={{flex: 4}}>
          <WorkoutSetMetrics workoutSet={item} />
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const date = this.props.navigation.state.params.date;
    const allSets = this.props.workoutSetsByDayByExerciseSections[date];

    if (!allSets) {
      return null;
    }

    return (
      <View style={globalStyles.screen}>
        <SectionList
          sections={allSets}
          renderItem={this.renderRow}
          renderSectionHeader={({section}) => (
            <SectionHeader title={section.title} />
          )}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={extractUuid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
