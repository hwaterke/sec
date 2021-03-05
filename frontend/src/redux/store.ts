import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {rootReducer} from './reducers/rootReducer'
import {persistReducer, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['backend', 'token'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store)
