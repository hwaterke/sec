import React from 'react';
import {View, Text, TouchableHighlight, Modal, StyleSheet} from 'react-native';
import {exercisesByIdSelector} from '../../selectors/exercices';
import {connect} from 'react-redux';
import {ExercisesList} from '../exercises/ExercisesList';
import {globalStyles} from '../../constants/styles';

const mapStateToProps = (state) => ({
  exercises: exercisesByIdSelector(state),
});

@connect(mapStateToProps)
export class ExerciseSelectField extends React.Component {

  state = {
    modalVisible: false
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  getExerciseName(value) {
    if (value) {
      return this.props.exercises[value].name;
    }
    return 'Exercise';
  }

  render() {
    const {input: {value, onChange}, meta, onExerciseSelected, ...custom} = this.props;
    return (
      <View>
        <TouchableHighlight onPress={this.toggleModal} style={styles.container}>
          <Text>{this.getExerciseName(value)}</Text>
        </TouchableHighlight>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={globalStyles.modal}>
            <ExercisesList
              onRowPress={(rowData) => {
                onChange(rowData.uuid);
                if (onExerciseSelected) {
                  onExerciseSelected(rowData.uuid);
                }
                this.toggleModal();
              }}
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
