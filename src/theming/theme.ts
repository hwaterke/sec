import {DefaultTheme as DefaultNavigationTheme} from '@react-navigation/native'
import {StyleSheet} from 'react-native'

export const theme = {
  colors: {
    background: {
      primary: '#80CBC4',
      secondary: '#eee',
      editing: '#E9D460',
      row: 'white',
    },
    border: '#ddd',
    text: {
      primary: '#222',
      secondary: '#999',
      link: 'white',
      header: 'white',
    },
    button: {
      primary: {
        text: 'white',
        background: '#333',
      },
    },
  },

  borderWidth: StyleSheet.hairlineWidth,

  navigation: {
    ...DefaultNavigationTheme,
    colors: {
      ...DefaultNavigationTheme.colors,
      primary: 'white',
      card: '#80CBC4',
      text: 'white',
      background: '#f5f5f5',
    },
  },
}

export type Theme = typeof theme
