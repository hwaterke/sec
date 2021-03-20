import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {SplashScreen} from './components/SplashScreen'
import {AuthLoader} from './modules/auth/AuthLoader'
import {persistor, store} from './redux/store'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <AuthLoader />
      </PersistGate>
    </Provider>
  )
}
