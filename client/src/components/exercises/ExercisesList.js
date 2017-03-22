import React from 'react';
import {View, Text as RNText, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {exercisesByMuscleThenNameSelector} from '../../selectors/exercices';
import {globalStyles} from '../../constants/styles';
import {Row, Text, ListView} from '@shoutem/ui';
import {ExerciseResource} from '../../entities/ExerciseResource';

const mapStateToProps = (state) => ({
  exercises: exercisesByMuscleThenNameSelector(state),
});

@connect(mapStateToProps)
export class ExercisesList extends React.Component {

  static propTypes = {
    exercises: React.PropTypes.arrayOf(ExerciseResource.propType).isRequired,
    onRowPress: React.PropTypes.func.isRequired
  };

  renderRow = (exercise) => {
    return (
      <TouchableOpacity onPress={() => this.props.onRowPress(exercise)}>
        <Row style={{borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth}}>
          <Text>{exercise.name}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  renderHeader = (h) => {
    return (
      <View style={globalStyles.listSectionHeader}>
        <RNText style={globalStyles.listSectionHeaderText}>{h}</RNText>
      </View>
    );
  };

  getSectionId = (e) => {
    if (e.cardio) {
      return 'Cardio';
    }
    return e.main_muscle || 'Other';
  };

  render() {
    console.log(this.props.exercises)
    return (
      <ListView
        data={this.props.exercises}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderHeader}
        getSectionId={this.getSectionId}
      />

    );
  }
}
