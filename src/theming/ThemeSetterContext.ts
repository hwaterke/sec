import React from 'react'
import {Theme} from './theme'

export const ThemeSetterContext = React.createContext<
  ((theme: Theme) => void) | null
>(null)
