import React from 'react';
import {TextInput} from '@shoutem/ui';

class NumberInputField extends React.Component {

  static propTypes = {
    input: React.PropTypes.shape({
      value: React.PropTypes.string,
      onChange: React.PropTypes.func.isRequired
    }).isRequired,
    meta: React.PropTypes.object,
  };

  render() {
    const {input: {value, onChange}, meta, ...custom} = this.props;
    return (
      <TextInput
        value={value}
        onChangeText={value => onChange(value)}
        keyboardType="numeric"
        {...custom}
      />
    );
  }
}

export default NumberInputField;
