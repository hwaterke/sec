import React from 'react';
import {View, ListView, Text} from 'react-native';
import {connect} from 'react-redux';
import {ExerciseRow} from './ExercisesRow';
import {exercisesByNameSelector} from '../../selectors/exercices';
import {globalStyles} from '../../constants/styles';

const mapStateToProps = (state) => ({
  exercises: exercisesByNameSelector(state),
});

@connect(mapStateToProps)
export class ExercisesList extends React.Component {
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

  updateDatasource(exercises) {
    let {data, sectionIds} = this._getListViewData(exercises);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds)
    });
  }

  // Also do it on first mount ...
  componentDidMount() {
    this.updateDatasource(this.props.exercises);
  }

  // Only called in updates
  componentWillReceiveProps(nextProps) {
    if (nextProps.exercises != this.props.exercises) {
      this.updateDatasource(nextProps.exercises);
    }
  }

  _getListViewData(exercises) {
    let data = {};
    let sectionIds = [];

    exercises.forEach(e => {
      let section = e.name.charAt(0);
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(e);
    });

    return {data, sectionIds};
  }

  onPress = (row) => {
    this.props.onRowPress(row);
  };

  renderRow(rowData) {
    return (
      <ExerciseRow
        item={rowData}
        onPress={() => this.onPress(rowData)}
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
