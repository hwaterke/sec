import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {globalStyles} from '../../constants/styles'
import muscles from '../../constants/muscles'
import {Row} from '../dumb/Row'

export class MuscleSelectField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    modalVisible: false,
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  rowPress = muscle => {
    if (muscle.name === 'NONE') {
      this.props.input.onChange(null)
    } else {
      this.props.input.onChange(muscle.name)
    }
    this.toggleModal()
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.rowPress(item)}>
        <Row>
          <Text>{item.name}</Text>
        </Row>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal} style={styles.container}>
          <Text>{this.props.input.value || 'Muscle'}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={globalStyles.modal}>
            <Button title="Close" onPress={this.toggleModal} />

            <FlatList
              data={[{name: 'NONE'}, ...muscles].map(m => ({
                ...m,
                key: m.name,
              }))}
              renderItem={this.renderRow}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
