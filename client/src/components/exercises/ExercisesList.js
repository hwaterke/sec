import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {Image, SectionList, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../../constants/colors';
import {Row} from '../dumb/Row';
import {SectionHeader} from '../dumb/SectionHeader';
import {uidSelector} from '../../selectors/firebaseSelectors';
import {groupBy, pipe, sortWith, ascend, prop} from 'ramda';
import {LoadingScreen} from '../dumb/LoadingScreen';

const muscleName = e => e.main_muscle || (e.cardio && 'Cardio') || 'zzzz';
const sortByName = sortWith([ascend(muscleName), ascend(prop('name'))]);
const groupByMuscle = groupBy(muscleName);

const getSections = data =>
  pipe(sortByName, groupByMuscle, groups => {
    return Object.keys(groups).map(muscle => ({
      data: groups[muscle],
      title: muscle === 'zzzz' ? 'Other' : muscle
    }));
  })(data);

export class ExercisesList extends React.Component {
  static propTypes = {
    onRowPress: PropTypes.func.isRequired
  };

  state = {
    exercises: [],
    loaded: false
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection('users')
      .doc(uidSelector(firebase))
      .collection('exercises')
      .get()
      .then(snap => {
        const data = [];
        snap.forEach(doc => {
          data.push({
            ...doc.data(),
            id: doc.id
          });
        });
        return data;
      })
      .then(exercises => this.setState({exercises, loaded: true}));
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.onRowPress(item)}>
        <Row>
          <Text>{item.name}</Text>
          {item.is_machine && (
            <Ionicons
              style={{color: colors.headerColor}}
              size={20}
              name="ios-cog"
            />
          )}
          {item.with_dumbbell && (
            <Image source={require('../../assets/dumbbell_20h.png')} />
          )}
          {item.with_barbell && (
            <Image source={require('../../assets/barbell_20h.png')} />
          )}
        </Row>
      </TouchableOpacity>
    );
  };

  render() {
    const {loaded} = this.state;
    if (!loaded) {
      return <LoadingScreen />;
    }
    const sections = getSections(this.state.exercises);
    return (
      <SectionList
        sections={sections}
        renderItem={this.renderRow}
        renderSectionHeader={({section}) => (
          <SectionHeader title={section.title} />
        )}
        keyExtractor={e => e.id}
      />
    );
  }
}
