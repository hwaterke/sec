import React from 'react';
import PropTypes from 'prop-types';
import {arraySelector, byIdSelector} from 'hw-react-shared';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {globalStyles} from '../../constants/styles';
import {MuscleResource} from '../../entities/MuscleResource';
import {Row} from '../dumb/Row';

const mapStateToProps = state => ({
  muscleArray: arraySelector(MuscleResource)(state),
  muscles: byIdSelector(MuscleResource)(state)
});

@connect(mapStateToProps)
export class MuscleSelectField extends React.Component {
  static propTypes = {
    muscleArray: PropTypes.arrayOf(MuscleResource.propType).isRequired,
    muscles: PropTypes.objectOf(MuscleResource.propType).isRequired,
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired
    }).isRequired
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

  rowPress = muscle => {
    if (muscle.name === 'NONE') {
      this.props.input.onChange(null);
    } else {
      this.props.input.onChange(muscle.name);
    }
    this.toggleModal();
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.rowPress(item)}>
        <Row>
          <Text>{item.name}</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal} style={styles.container}>
          <Text>{this.getMuscleName(this.props.input.value)}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={globalStyles.modal}>
            <Button title="Close" onPress={this.toggleModal} />

            <FlatList
              data={[{name: 'NONE'}, ...this.props.muscleArray].map(m => ({
                ...m,
                key: m.name
              }))}
              renderItem={this.renderRow}
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
