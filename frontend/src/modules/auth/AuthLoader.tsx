import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationNativeContainer} from '@react-navigation/native'
import {MainTabNavigator} from '../home/MainTabNavigator'
import {SignInScreen} from './SignInScreen'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/token'
import {ThemeProvider} from 'styled-components/native'
import {theme} from '../../theming/theme'

const Stack = createStackNavigator()

export const AuthLoader: React.FC = () => {
  const token = useSelector(selectToken)

  return (
    <ThemeProvider theme={theme}>
      <NavigationNativeContainer theme={theme.navigation}>
        {token === null ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={SignInScreen} />
          </Stack.Navigator>
        ) : (
          <MainTabNavigator />
        )}
      </NavigationNativeContainer>
    </ThemeProvider>
  )
}
