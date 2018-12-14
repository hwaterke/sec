import {StyleSheet} from 'react-native'
import {colors} from './colors'

export const rubikText = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 15,
  color: '#666666',
}

export const globalStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  modal: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.backgroundColor,
  },

  header: {
    backgroundColor: colors.headerColor,
    // iOS
    borderBottomWidth: 0,
    // Android
    elevation: 0,
  },

  headerEdit: {
    backgroundColor: '#E9D460',
    // iOS
    borderBottomWidth: 0,
    // Android
    elevation: 0,
  },

  card: {
    backgroundColor: colors.backgroundColor,
  },
})
