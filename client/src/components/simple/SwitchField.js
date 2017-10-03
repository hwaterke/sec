import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {colors} from '../../constants/colors';

export class SwitchField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.shape({
      value: PropTypes.any,
      onChange: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {input: {value, onChange}, label} = this.props;
    return (
      <View style={styles.container}>
        <Text>{label}</Text>
        <Switch value={!!value} onValueChange={value => onChange(value)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.discreteTextColor,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
