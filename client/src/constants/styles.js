import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const rubikText = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 15,
  color: '#666666'
};

export const globalStyles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },

  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },

  modal: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.backgroundColor
  },

  header: {
    backgroundColor: colors.headerColor
  },

  headerEdit: {
    backgroundColor: '#E9D460'
  },

  card: {
    backgroundColor: colors.backgroundColor
  }
});
