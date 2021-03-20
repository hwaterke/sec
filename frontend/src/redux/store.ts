import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {AsyncStorage} from 'react-native'
import {persistReducer, persistStore} from 'redux-persist'
import {rootReducer} from './reducers/rootReducer'

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
