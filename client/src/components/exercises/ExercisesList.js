import React from 'react'
import PropTypes from 'prop-types'
import {Image, SectionList, Text, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {connect} from 'react-redux'
import {exercisesGroupedByMuscle} from '../../selectors/exercises'
import {ExerciseResource} from '../../entities/ExerciseResource'
import {colors} from '../../constants/colors'
import {extractUuid} from '../../constants/keyExtractor'
import {Row} from '../dumb/Row'
import {SectionHeader} from '../dumb/SectionHeader'
import {SearchListHeader} from '../dumb/SearchListHeader'

const safeUpper = value => (value ? value.toUpperCase() : '')

const mapStateToProps = state => ({
  exercises: exercisesGroupedByMuscle(state),
})

@connect(mapStateToProps)
export class ExercisesList extends React.Component {
  static propTypes = {
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(ExerciseResource.propType).isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    onRowPress: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
    sections: this.props.exercises,
  }

  search = searchTerm => {
    const value = safeUpper(searchTerm)

    const ns = this.props.exercises
      .map(section => {
        return {
          ...section,
          data: section.data.filter(
            e =>
              searchTerm === '' ||
              safeUpper(e.name).includes(value) ||
              safeUpper(e.main_muscle).includes(value)
          ),
        }
      })
      .filter(section => section.data.length > 0)

    this.setState({sections: ns, searchTerm})
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
    )
  }

  render() {
    return (
      <SectionList
        sections={this.state.sections}
        renderItem={this.renderRow}
        renderSectionHeader={({section}) => (
          <SectionHeader title={section.title} />
        )}
        keyExtractor={extractUuid}
        ListHeaderComponent={
          <SearchListHeader
            value={this.state.searchTerm}
            onChangeText={this.search}
          />
        }
      />
    )
  }
}
