import React from 'react';
import {AsyncStorage, StatusBar, StyleSheet, View} from 'react-native';
import {appReducer} from '../reducers';
import {autoRehydrate, persistStore} from 'redux-persist';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {colors} from '../constants/colors';
import {LoginDispatcher} from './LoginDispatcher';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(thunk), autoRehydrate());

// Creation of Redux store
const store = createStore(appReducer, enhancers);

export class App extends React.Component {
  componentDidMount() {
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: ['navigation', 'form']
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <LoginDispatcher />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  }
});
