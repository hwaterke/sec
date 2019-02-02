import React from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView, Text, Modal, StyleSheet} from 'react-native'
import {globalStyles} from '../../constants/styles'
import {Button} from '../dumb/Button'

export class JsonDebug extends React.Component {
  static propTypes = {
    value: PropTypes.any,
  }

  state = {
    modalVisible: false,
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  render() {
    return (
      <View>
        <Button onPress={this.toggleModal}>JSON</Button>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <ScrollView style={globalStyles.modal}>
            <Button onPress={this.toggleModal}>Close</Button>
            <Text style={styles.debug}>
              {JSON.stringify(this.props.value, undefined, 2)}
            </Text>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  debug: {
    padding: 4,
    backgroundColor: 'white',
  },
})
