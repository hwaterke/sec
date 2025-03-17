import React from 'react'
import {View, Alert} from 'react-native'
import {Button} from '../../../components/Button'
import {DatabaseService} from '../../../database/database-service'
import {Stack} from 'expo-router'

export default function SettingsHome() {
  return (
    <View className="flex-1 bg-light-bg p-6 gap-2">
      <Stack.Screen options={{title: 'Settings'}} />
      <Button onPress={() => DatabaseService.exportDatabase()}>
        Export database
      </Button>
      <Button onPress={() => DatabaseService.importDatabase()}>
        Import database
      </Button>
      <Button
        onPress={() => {
          Alert.alert(
            'Reset Database',
            'Are you sure you want to reset the database? This action cannot be undone.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Reset',
                style: 'destructive',
                onPress: async () => {
                  await DatabaseService.resetDatabase()
                  Alert.alert('Success', 'Database has been reset')
                },
              },
            ]
          )
        }}
      >
        Reset database
      </Button>
    </View>
  )
}
