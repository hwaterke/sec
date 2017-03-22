import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../constants/colors';
import {api} from '../api/api';
import {MuscleResource} from '../entities/MuscleResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';

@connect(state => ({
  resources: state.resources
}))
@api()
export class SettingsResources extends React.Component {

  static propTypes = {
    resources: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    fetchAll: React.PropTypes.func.isRequired
  };

  fetchAll = () => {
    this.props.fetchAll(MuscleResource.path).then(() =>
      this.props.fetchAll(ExerciseResource.path).then(() =>
        this.props.fetchAll(WorkoutSetResource.path)
      )
    );
  };

  render() {
    return (
      <View style={styles.box}>

        {Object.keys(this.props.resources).map(k => (
          <View key={k} style={styles.flex}>
            <Text>{k}</Text>
            <Text>{Object.keys(this.props.resources[k]).length}</Text>
          </View>

        ))}

        <Button
          title="Clear local state"
          onPress={() => this.props.dispatch({type: 'RESET_RESOURCES'})}
        />

        <Button
          title="Fetch from server"
          onPress={this.fetchAll}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    paddingVertical: 6,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  box: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
