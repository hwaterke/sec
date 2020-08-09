import * as styledComponents from 'styled-components/native'
import {theme} from './theme'

const {
  default: styled,
  css,
  ThemeProvider,
  ThemeContext,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  typeof theme
>

export {css, ThemeProvider, ThemeContext}
export default styled
