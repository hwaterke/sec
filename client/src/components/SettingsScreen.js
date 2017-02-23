import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Banner} from './simple/Banner';
import {globalStyles} from '../constants/styles';
import {clearToken} from '../reducers/authentication';
import {api} from '../api/api';
import {ExerciseResource} from '../entities/ExerciseResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {exercisesArraySelector} from '../selectors/exercices';
import {workoutSetsArraySelector} from '../selectors/workout_sets';

@api()
@connect(state => ({
  backend: state.backend,
  exercises: exercisesArraySelector(state).length,
  workoutSets: workoutSetsArraySelector(state).length
}))
export class SettingsScreen extends React.Component {

  static propTypes = {
    backend: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    fetchAll: React.PropTypes.func.isRequired,
    exercises: React.PropTypes.number.isRequired,
    workoutSets: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <Banner />

        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Logged in to {this.props.backend}</Text>
            <Button
              title="Sign out"
              onPress={() => this.props.dispatch(clearToken())}
            />
          </View>

          <View style={styles.box}>
            <Text>{this.props.exercises} exercises</Text>
            <Text>{this.props.workoutSets} sets</Text>
          </View>

          <View style={styles.box}>
            <Button
              title="Clear local state"
              onPress={() => this.props.dispatch({type:'RESET_RESOURCES'})}
            />
          </View>

          <View style={styles.box}>
            <Button
              title="Fetch from server"
              onPress={() => {
                this.props.fetchAll(ExerciseResource.path).then(() => {
                  this.props.fetchAll(WorkoutSetResource.path);
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  box: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});

