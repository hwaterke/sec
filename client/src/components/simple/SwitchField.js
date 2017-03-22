import React from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export class SwitchField extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    input: React.PropTypes.shape({
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired
    }).isRequired,
    meta: React.PropTypes.object,
  };

  render() {
    const {input: {value, onChange}, meta, label, ...custom} = this.props;
    return (
      <View style={styles.container}>
        <Text>{label}</Text>
        <Switch
          value={!!value}
          onValueChange={value => onChange(value)}
          {...custom}
        />
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
    borderColor: colors.veryDarkPrimaryColor,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
