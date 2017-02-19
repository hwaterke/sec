import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({

  flexContainer: {
    flex: 1
  },

  modal: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.backgroundColor
  },

  textInput: {
    height: 34
  },

  header: {
    backgroundColor: colors.headerColor
  },

  card: {
    backgroundColor: colors.backgroundColor
  },

  listSectionHeader: {
    backgroundColor: colors.darkPrimaryColor
  },

  listSectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },

  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginHorizontal: 10,
  },

  rowSeparatorHide: {
    opacity: 0.0,
  }
});
