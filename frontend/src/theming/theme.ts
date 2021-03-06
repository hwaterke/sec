import {StyleSheet} from 'react-native'
import {DefaultTheme as DefaultNavigationTheme} from '@react-navigation/native'

export const theme = {
  colors: {
    background: {
      primary: '#2ab7ca',
      secondary: '#eee',
    },
    border: '#ddd',
    text: {
      primary: '#222',
      secondary: '#999',
      link: DefaultNavigationTheme.colors.primary,
    },
    button: {
      primary: {
        text: 'white',
        background: '#333',
      },
    },
  },

  borderWidth: StyleSheet.hairlineWidth,

  navigation: DefaultNavigationTheme,
}

export type Theme = typeof theme
