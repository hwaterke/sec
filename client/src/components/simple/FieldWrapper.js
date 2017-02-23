import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export class FieldWrapper extends React.Component {
  static propTypes = {
    label: React.PropTypes.string,
    children: React.PropTypes.element,
    row: React.PropTypes.bool,
  };

  render() {
    return (
      <View style={styles.wrapper}>
        { this.props.label &&
        <Text style={styles.label}>{this.props.label}</Text>
        }
        <View style={styles.field}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: colors.discreteTextColor
  },
  field: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.veryDarkPrimaryColor
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 4,
    marginBottom: 8
  }
});
