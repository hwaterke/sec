import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import ExercisesForm from './ExercisesForm';
import {exercisesByIdSelector} from '../../selectors/exercices';
import {globalStyles} from '../../constants/styles';

@connect(state => ({exercises: exercisesByIdSelector(state)}))
export class ExercisesEditScreen extends React.Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      goBack: React.PropTypes.func.isRequired,
      state: React.PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    return (
      <View style={globalStyles.flexContainer}>
        <ExercisesForm
          updatedResource={this.props.exercises[this.props.navigation.state.params.resourceId]}
          postSubmit={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
