import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';

export class Screen extends React.Component {
  static propTypes = {
    scroll: PropTypes.bool,
    padding: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    scroll: false,
    padding: false
  };

  render() {
    if (this.props.scroll) {
      return (
        <ScrollView
          style={
            this.props.padding ? styles.containerWithPadding : styles.container
          }
        >
          {this.props.children}
        </ScrollView>
      );
    }

    return (
      <View
        style={
          this.props.padding ? styles.containerWithPadding : styles.container
        }
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },

  containerWithPadding: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: 16
  }
});
