import {Component} from 'react';
import PropTypes from 'prop-types';
import {getWorkoutRef} from '../../utils/firestoreUtils';

export class WorkoutsForExerciseProvider extends Component {
  static propTypes = {
    exerciseId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };

  state = {
    isLoaded: false,
    sets: null
  };

  componentDidMount() {
    getWorkoutRef()
      .doc('sets')
      .collection(this.props.exerciseId)
      .get()
      .then(snapshots => {
        const sets = [];
        snapshots.forEach(set => {
          sets.push({
            ...set.data(),
            id: set.id
          });
        });
        this.setState({sets, isLoaded: true});
      });
  }

  render() {
    const {children} = this.props;
    return children(this.state);
  }
}
