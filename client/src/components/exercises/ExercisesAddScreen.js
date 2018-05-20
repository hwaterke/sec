import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {ExercisesForm} from './ExercisesForm';
import {Screen} from '../dumb/Screen';
import {uidSelector} from '../../selectors/firebaseSelectors';

export class ExercisesAddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  createResource = data =>
    firebase
      .firestore()
      .collection('users')
      .doc(uidSelector(firebase))
      .collection('exercises')
      .add(data);

  handleSubmit = data => {
    this.createResource(data).then(this.props.navigation.goBack);
  };

  render() {
    return (
      <Screen scroll padding>
        <ExercisesForm handleSubmit={this.handleSubmit} />
      </Screen>
    );
  }
}
