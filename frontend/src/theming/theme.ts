import {StyleSheet} from 'react-native'
import {DefaultTheme as DefaultNavigationTheme} from '@react-navigation/native'
import type {DefaultTheme} from 'styled-components'

export const theme: DefaultTheme = {
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
  },

  borderWidth: StyleSheet.hairlineWidth,

  navigation: DefaultNavigationTheme,
}
