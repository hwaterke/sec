import {Component} from 'react';
import PropTypes from 'prop-types';
import {uidSelector} from '../../selectors/firebaseSelectors';
import firebase from 'firebase';

const getExercisesRef = () =>
  firebase
    .firestore()
    .collection('users')
    .doc(uidSelector(firebase))
    .collection('exercises');

export class ExerciseProvider extends Component {
  static propTypes = {
    exerciseId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };

  state = {
    isLoaded: false,
    exercise: null
  };

  componentDidMount() {
    getExercisesRef()
      .doc(this.props.exerciseId)
      .get()
      .then(snap => snap.data())
      .then(exercise => this.setState({exercise, isLoaded: true}));
  }

  render() {
    const {children} = this.props;
    return children(this.state);
  }
}
