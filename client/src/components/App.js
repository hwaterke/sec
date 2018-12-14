import React, {Fragment} from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'
import {persistor, store} from '../store/store'
import {MainNavigator} from './MainNavigator'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Fragment>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <MainNavigator />
          </Fragment>
        </PersistGate>
      </Provider>
    )
  }
}
