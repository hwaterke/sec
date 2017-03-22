import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {workoutSetsByDaySelector} from '../../selectors/workout_sets';
import {connect} from 'react-redux';
import {Screen, Row, Text, ListView, Icon} from '@shoutem/ui';
import {colors} from '../../constants/colors';

const mapStateToProps = (state) => ({
  workoutSetsByDay: workoutSetsByDaySelector(state),
});

@connect(mapStateToProps)
export class SummaryListScreen extends React.Component {
  renderRow = (rowData) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Summary', {date: rowData})}>
        <Row style={{borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth}}>
          <Text>{rowData}</Text>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>
    );
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
