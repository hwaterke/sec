import React from 'react'
import {AuthLoader} from './modules/auth/AuthLoader'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import {SplashScreen} from './components/SplashScreen'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <AuthLoader />
      </PersistGate>
    </Provider>
  )
}
