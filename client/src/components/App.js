import React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'
import {colors} from '../constants/colors'
import {persistor, store} from '../store/store'
import {TopBar} from './dumb/TopBar'
import {LoginDispatcher} from './LoginDispatcher'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <TopBar />
            <LoginDispatcher />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
})
