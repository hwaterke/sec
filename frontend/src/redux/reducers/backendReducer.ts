import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit'

export const setBackend = createAction<string>('SET_BACKEND')
export const clearBackend = createAction<void>('CLEAR_BACKEND')

export const backendReducer = createReducer<string | null>(null, {
  [setBackend.type]: (state, action: PayloadAction<string>) => action.payload,
  [clearBackend.type]: () => null,
})
