import React from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import {ExercisesForm} from './ExercisesForm'
import {Screen} from '../dumb/Screen'
import {uidSelector} from '../../selectors/firebaseSelectors'

export class ExercisesAddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    isCreating: false,
  }

  createResource = data =>
    firebase
      .firestore()
      .collection('users')
      .doc(uidSelector(firebase))
      .collection('exercises')
      .add(data)

  handleSubmit = data => {
    this.setState({isCreating: true})
    this.createResource(data).then(() => {
      this.setState({isCreating: false}, () => this.props.navigation.goBack())
    })
  }

  render() {
    const {isCreating} = this.state
    return (
      <Screen scroll padding>
        <ExercisesForm
          isUpdating={isCreating}
          handleSubmit={this.handleSubmit}
        />
      </Screen>
    )
  }
}
