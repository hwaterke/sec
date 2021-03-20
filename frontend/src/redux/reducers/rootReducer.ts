import {combineReducers} from '@reduxjs/toolkit'
import {backendReducer} from './backendReducer'
import {tokenReducer} from './tokenReducer'

export const rootReducer = combineReducers({
  backend: backendReducer,
  token: tokenReducer,
})

export type RootState = ReturnType<typeof rootReducer>
