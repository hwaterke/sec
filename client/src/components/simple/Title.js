import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const Title = ({content}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{content}</Text>
  </View>
);

Title.propTypes = {
  content: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    color: colors.discreteTextColor,
    paddingLeft: 12
  }
});
