import React from 'react';
import {View} from 'react-native';
import ExercisesForm from './ExercisesForm';
import {globalStyles} from '../../constants/styles';

export class ExercisesAddScreen extends React.Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      goBack: React.PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <ExercisesForm postSubmit={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
