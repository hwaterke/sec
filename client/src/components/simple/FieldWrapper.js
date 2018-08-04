import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import {Caption} from '../dumb/Caption'

export class FieldWrapper extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.element,
  }

  render() {
    return (
      <View>
        {this.props.label && <Caption>{this.props.label}</Caption>}
        <View>{this.props.children}</View>
      </View>
    )
  }
}
