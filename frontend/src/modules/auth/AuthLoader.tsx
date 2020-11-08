import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {SignInScreen} from './SignInScreen'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/token'
import {ThemeProvider} from 'styled-components/native'
import {theme} from '../../theming/theme'
import {MainStackNavigator} from '../home/MainStackNavigator'

const Stack = createStackNavigator()

export const AuthLoader: React.FC = () => {
  const token = useSelector(selectToken)

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme.navigation}>
        {token === null ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={SignInScreen} />
          </Stack.Navigator>
        ) : (
          <MainStackNavigator />
        )}
      </NavigationContainer>
    </ThemeProvider>
  )
}
