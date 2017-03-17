import React from 'react';
import {View, StyleSheet} from 'react-native';
import {stringToNumber} from '../../utils/conversion';
import {Text, Button, TextInput} from '@shoutem/ui';

export class NumberInputWithButtonsField extends React.Component {
  static propTypes = {
    input: React.PropTypes.shape({
      value: React.PropTypes.string,
      onChange: React.PropTypes.func.isRequired
    }).isRequired,
    meta: React.PropTypes.object,
  };

  increase = () => {
    this.props.input.onChange((stringToNumber(this.props.input.value) + 1).toString());
  };

  decrease = () => {
    this.props.input.onChange((stringToNumber(this.props.input.value) - 1).toString());
  };

  render() {
    const {input: {value, onChange}, meta, ...custom} = this.props;
    return (
      <View style={styles.container}>

        <Button styleName="sm-gutter border" onPress={this.decrease}>
          <Text>-</Text>
        </Button>

        <View style={styles.grow}>
          <TextInput
            style={{textAlign: 'center'}}
            value={value}
            onChangeText={value => onChange(value)}
            keyboardType="numeric"
            {...custom}
          />
        </View>

        <Button styleName="sm-gutter border" onPress={this.increase}>
          <Text>+</Text>
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  grow: {
    flex: 1
  }
});
