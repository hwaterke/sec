import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {workoutSetsByDaySelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {Screen, Row, Text, ListView, Icon, Caption} from '@shoutem/ui';
import R from 'ramda';
import {exercisesByIdSelector, displayNameOfExercise} from '../../selectors/exercices';

const mapStateToProps = (state) => ({
  exercises: exercisesByIdSelector(state),
  workoutSetsByDay: workoutSetsByDaySelector(state),
});

@connect(mapStateToProps)
export class SummaryListScreen extends React.Component {
  renderRow = (rowData) => {

    const muscle = this.mainMuscleIn(this.props.workoutSetsByDay[rowData]);

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Summary', {date: rowData})}>
        <Row style={{borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth}}>
          <Text>{rowData}</Text>
          <Caption>{muscle}</Caption>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>
    );
  };

  mainMuscleIn = (workoutSets) => {
    const exercices = R.map(ws => this.props.exercises[ws.exercise_uuid])(workoutSets);
    const muscleCountObject = R.countBy(displayNameOfExercise)(exercices);
    const sortedMuscle = R.sortBy(R.prop(1))(R.toPairs(muscleCountObject));
    return R.last(sortedMuscle)[0];
  };

  render() {
    return (
      <Screen>
        <ListView
          data={Object.keys(this.props.workoutSetsByDay)}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}
