import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {ThemeProvider} from 'styled-components/native'
import {ApolloProviderWithAuth} from '../../graphql/ApolloProviderWithAuth'
import {selectBackend} from '../../redux/selectors/backend'
import {selectToken} from '../../redux/selectors/token'
import {Theme, theme} from '../../theming/theme'
import {ThemeSetterContext} from '../../theming/ThemeSetterContext'
import {MainStackNavigator} from '../home/MainStackNavigator'
import {BackendSelectionScreen} from './BackendSelectionScreen'
import {SignInScreen} from './SignInScreen'

const Stack = createStackNavigator()

export const AuthLoader: React.FC = () => {
  const backend = useSelector(selectBackend)
  const token = useSelector(selectToken)
  const [activeTheme, setTheme] = useState<Theme>(theme)

  return (
    <ThemeSetterContext.Provider value={setTheme}>
      <ThemeProvider theme={activeTheme}>
        <NavigationContainer theme={activeTheme.navigation}>
          <ApolloProviderWithAuth>
            {backend ? (
              token === null ? (
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={SignInScreen} />
                </Stack.Navigator>
              ) : (
                <MainStackNavigator />
              )
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name="Backend"
                  component={BackendSelectionScreen}
                />
              </Stack.Navigator>
            )}
          </ApolloProviderWithAuth>
        </NavigationContainer>
      </ThemeProvider>
    </ThemeSetterContext.Provider>
  )
}
