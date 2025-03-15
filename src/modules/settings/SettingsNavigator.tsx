import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {View, Alert} from 'react-native'
import {Button} from '../../components/Button'
import {DatabaseService} from '../../database/database-service'

const Stack = createNativeStackNavigator()

export const SettingsHome = () => {
  return (
    <View className="flex-1 bg-light-bg p-6 gap-2">
      <Button onPress={() => DatabaseService.exportDatabase()}>
        Export database
      </Button>
      <Button onPress={() => DatabaseService.importDatabase()}>
        Import database
      </Button>
      <Button
        onPress={async () => {
          await DatabaseService.resetDatabase()
          Alert.alert('Database reset')
        }}
      >
        Reset database
      </Button>
    </View>
  )
}

export const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  )
}
