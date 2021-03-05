import {combineReducers} from '@reduxjs/toolkit'
import {tokenReducer} from './tokenReducer'
import {backendReducer} from './backendReducer'

export const rootReducer = combineReducers({
  backend: backendReducer,
  token: tokenReducer,
})

export type RootState = ReturnType<typeof rootReducer>
