import React from 'react';
import {TextInput} from 'react-native';
import {globalStyles} from '../../constants/styles';

class TextInputField extends React.Component {

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
        style={globalStyles.textInput}
        value={value}
        onChangeText={value => onChange(value)}
        {...custom}
      />
    );
  }
}

export default TextInputField;
