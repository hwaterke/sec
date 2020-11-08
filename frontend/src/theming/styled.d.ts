import 'styled-components'
import type {Theme} from '@react-navigation/native'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string
        secondary: string
      }
      text: {
        primary: string
        secondary: string
        link: string
      }
      border: string
    }

    borderWidth: number

    navigation: Theme
  }
}
