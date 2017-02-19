import React from 'react';
import {View, ListView, Text} from 'react-native';
import {connect} from 'react-redux';
import {workoutSetsByDateSelector} from '../../selectors/workout_sets';
import {exercisesByIdSelector} from '../../selectors/exercices';
import moment from 'moment';
import {WorkoutSetsRow} from './WorkoutSetsRow';
import {globalStyles} from '../../constants/styles';

const mapStateToProps = (state) => ({
  workoutSets: workoutSetsByDateSelector(state),
  exercisesById: exercisesByIdSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsList extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource
    };

    this.renderRow = this.renderRow.bind(this);
  }

  updateDatasource(workoutSets) {
    let {data, sectionIds} = this._getListViewData(workoutSets);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds)
    });
  }

  // Also do it on first mount ...
  componentDidMount() {
    this.updateDatasource(this.props.workoutSets);
  }

  // Only called in updates
  componentWillReceiveProps(nextProps) {
    if (nextProps.workoutSets != this.props.workoutSets) {
      this.updateDatasource(nextProps.workoutSets);
    }
  }

  _getListViewData(workoutSets) {
    let data = {};
    let sectionIds = [];

    workoutSets.forEach(ws => {
      let section = moment(ws.executed_at, 'YYYY-MM-DD').format('D MMM');
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(ws);
    });

    return {data, sectionIds};
  }

  renderRow(rowData) {
    return (
      <WorkoutSetsRow
        exercise={this.props.exercisesById[rowData.exercise_uuid]}
        set={rowData}
        onPress={() => this.props.onRowPress(rowData)}
      />
    );
  }

  _renderSectionHeader(_, sectionId) {
    return (
      <View style={globalStyles.listSectionHeader}>
        <Text style={globalStyles.listSectionHeaderText}>{sectionId}</Text>
      </View>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let style = globalStyles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, globalStyles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={style} />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this._renderSectionHeader}
        renderSeparator={this._renderSeparator}
      />
    );
  }
}
