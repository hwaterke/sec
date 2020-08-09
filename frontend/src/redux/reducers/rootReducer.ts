import {combineReducers} from '@reduxjs/toolkit'
import {tokenReducer} from './tokenReducer'

export const rootReducer = combineReducers({
  token: tokenReducer,
})

export type RootState = ReturnType<typeof rootReducer>
