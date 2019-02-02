import PropTypes from 'prop-types'
import React from 'react'
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {connect} from 'react-redux'
import {select} from 'redux-crud-provider'
import styled from 'styled-components'
import {MuscleResource} from '../../entities/MuscleResource'
import {Row} from '../dumb/Row'
import {musclesSortedSelector} from '../../selectors/muscles'
import {colors} from '../../constants/colors'
import {Button} from '../dumb/Button'

const ModalView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.backgroundColor};
`

const mapStateToProps = state => ({
  muscleArray: musclesSortedSelector(state),
  muscles: select(MuscleResource).byId(state),
})

@connect(mapStateToProps)
export class MuscleSelectField extends React.Component {
  static propTypes = {
    muscleArray: PropTypes.arrayOf(MuscleResource.propType).isRequired,
    muscles: PropTypes.objectOf(MuscleResource.propType).isRequired,
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

  getMuscleName(value) {
    if (value) {
      return this.props.muscles[value].name
    }
    return 'Muscle'
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
          <Text>{this.getMuscleName(this.props.input.value)}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
        >
          <ModalView>
            <Button onPress={this.toggleModal}>Close</Button>

            <FlatList
              data={[{name: 'NONE'}, ...this.props.muscleArray].map(m => ({
                ...m,
                key: m.name,
              }))}
              renderItem={this.renderRow}
            />
          </ModalView>
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
