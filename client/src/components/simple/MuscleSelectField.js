import React from 'react';
import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {globalStyles} from '../../constants/styles';
import {musclesByIdSelector, musclesArraySelector} from '../../selectors/muscles';
import {ListView, Row, Button, Text} from '@shoutem/ui';
import {MuscleResource} from '../../entities/MuscleResource';

const mapStateToProps = (state) => ({
  muscleArray: musclesArraySelector(state),
  muscles: musclesByIdSelector(state),
});

@connect(mapStateToProps)
export class MuscleSelectField extends React.Component {

  static propTypes = {
    muscleArray: React.PropTypes.arrayOf(MuscleResource.propType).isRequired,
    muscles: React.PropTypes.objectOf(MuscleResource.propType).isRequired
  };

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  getMuscleName(value) {
    if (value) {
      return this.props.muscles[value].name;
    }
    return 'Muscle';
  }

  rowPress = (muscle) => {
    if (muscle.name === 'NONE') {
      this.props.input.onChange(null);
    } else {
      this.props.input.onChange(muscle.name);
    }
    this.toggleModal();
  };

  renderRow = (muscle) => {
    return (
      <TouchableOpacity onPress={() => this.rowPress(muscle)}>
        <Row style={{borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth}}>
          <Text>{muscle.name}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  render() {
    const {input: {value, onChange}, meta, onExerciseSelected, ...custom} = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal} style={styles.container}>
          <Text>{this.getMuscleName(value)}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={globalStyles.modal}>

            <Button onPress={this.toggleModal}>
              <Text>Close</Text>
            </Button>

            <ListView
              data={[{name: 'NONE'}, ...this.props.muscleArray]}
              renderRow={this.renderRow}
            />

          </View>
        </Modal>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
