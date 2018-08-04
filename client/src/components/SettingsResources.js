import PropTypes from 'prop-types';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../constants/colors';
import {ExerciseResource} from '../entities/ExerciseResource';
import {MuscleResource} from '../entities/MuscleResource';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {crudThunks} from '../thunks/crudThunks';
import {Row} from './dumb/Row';

const mapDispatchToProps = {
  fetchAll: crudThunks.fetchAll
};

@connect(
  state => ({
    resources: state.resources
  }),
  mapDispatchToProps
)
export class SettingsResources extends React.Component {
  static propTypes = {
    resources: PropTypes.object.isRequired,
    fetchAll: PropTypes.func.isRequired
  };

  fetchAll = async () => {
    await this.props.fetchAll({resource: MuscleResource, replace: true});
    await this.props.fetchAll({resource: ExerciseResource, replace: true});
    await this.props.fetchAll({resource: WorkoutSetResource, replace: true});
  };

  render() {
    return (
      <View style={styles.box}>
        {Object.keys(this.props.resources).map(k => (
          <Row key={k}>
            <Text>{k}</Text>
            <Text>{Object.keys(this.props.resources[k]).length}</Text>
          </Row>
        ))}

        <Button title="Fetch from server" onPress={this.fetchAll} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
