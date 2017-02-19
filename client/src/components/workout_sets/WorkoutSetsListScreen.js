import React from 'react';
import {View} from 'react-native';
import {WorkoutSetsList} from './WorkoutSetsList';
import {globalStyles} from '../../constants/styles';

export class WorkoutSetsListScreen extends React.Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      navigate: React.PropTypes.func.isRequired,
      state: React.PropTypes.object.isRequired
    }).isRequired
  };

  isEdit = () => this.props.navigation.state.params && this.props.navigation.state.params.edit;

  onRowPress = (row) => {
    if (this.isEdit()) {
      this.props.navigation.navigate('WorkoutSetsEdit', {resourceId: row.uuid});
    } else {
      this.props.navigation.navigate('WorkoutSetsAdd', {workoutSet: row});
    }
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <WorkoutSetsList onRowPress={this.onRowPress} />
      </View>
    );
  }
}
