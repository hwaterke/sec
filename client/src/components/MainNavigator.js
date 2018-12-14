import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {SecTabNavigator} from './TabNavigator'
import {AuthLoadingScreen} from './AuthLoadingScreen'
import {LoginScreen} from './LoginScreen'

export const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: SecTabNavigator,
      Auth: LoginScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
