import React from 'react';
import {Caption, View} from '@shoutem/ui';

export class FieldWrapper extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    children: React.PropTypes.element,
    row: React.PropTypes.bool,
  };

  render() {
    return (
      <View styleName="sm-gutter-vertical">
        { this.props.label &&
        <Caption>{this.props.label}</Caption>
        }
        <View>
          {this.props.children}
        </View>
      </View>
    );
  }
}
