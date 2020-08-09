import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit'

export const setToken = createAction<string>('SET_TOKEN')
export const clearToken = createAction<void>('CLEAR_TOKEN')

export const tokenReducer = createReducer<string | null>(null, {
  [setToken.type]: (state, action: PayloadAction<string>) => action.payload,
  [clearToken.type]: () => null,
})
