import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {MuscleResource} from '../entities/MuscleResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {colors} from '../constants/colors';
import {crud} from '../hoc/crud';
import {Row} from './dumb/Row';

@connect(state => ({
  resources: state.resources
}))
@crud
export class SettingsResources extends React.Component {
  static propTypes = {
    resources: PropTypes.object.isRequired,
    fetchAll: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired
  };

  fetchAll = () => {
    this.props
      .fetchAll(MuscleResource, true)
      .then(() => this.props.fetchAll(ExerciseResource, true))
      .then(() => this.props.fetchAll(WorkoutSetResource, true));
  };

  clearAll = () => {
    [WorkoutSetResource, ExerciseResource, MuscleResource].forEach(r =>
      this.props.clearAll(r)
    );
  };

  render() {
    return (
      <View style={styles.box}>
        {Object.keys(this.props.resources).map(k => (
          <Row key={k}>
            <Text>{k}</Text>
            <Text>{Object.keys(this.props.resources[k]).length}</Text>
          </Row>
        ))}

        <Button title="Clear all" onPress={this.clearAll} />

        <Button title="Fetch from server" onPress={this.fetchAll} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
