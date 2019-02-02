import PropTypes from 'prop-types'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import styled from 'styled-components'
import reduxCrud from 'redux-crud'
import {colors} from '../constants/colors'
import {ExerciseResource} from '../entities/ExerciseResource'
import {MuscleResource} from '../entities/MuscleResource'
import {WorkoutSetResource} from '../entities/WorkoutSetResource'
import {crudThunks} from '../thunks/crudThunks'
import {Button} from './dumb/Button'

const Row = styled.View`
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`

const clearAll = () => dispatch => {
  const resources = [WorkoutSetResource, ExerciseResource, MuscleResource]

  resources.forEach(resource => {
    const baseActionCreators = reduxCrud.actionCreatorsFor(resource.name, {
      key: resource.key,
    })

    dispatch(baseActionCreators.fetchSuccess([], {replace: true}))
  })
}

const mapDispatchToProps = {
  fetchAll: crudThunks.fetchAll,
  clearAll,
}

@connect(
  state => ({
    resources: state.resources,
  }),
  mapDispatchToProps
)
export class SettingsResources extends React.Component {
  static propTypes = {
    resources: PropTypes.object.isRequired,
    fetchAll: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
  }

  fetchAll = async () => {
    await this.props.fetchAll({resource: MuscleResource, replace: true})
    await this.props.fetchAll({resource: ExerciseResource, replace: true})
    await this.props.fetchAll({resource: WorkoutSetResource, replace: true})
  }

  clearAll = async () => {}

  render() {
    return (
      <View style={styles.box}>
        {Object.keys(this.props.resources).map(k => (
          <Row key={k}>
            <Text>{k}</Text>
            <Text>{Object.keys(this.props.resources[k]).length}</Text>
          </Row>
        ))}

        <Button onPress={this.fetchAll}>Fetch from server</Button>

        <Button onPress={() => this.props.clearAll()}>Clear</Button>
      </View>
    )
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
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})
