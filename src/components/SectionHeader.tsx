import React from 'react'
import {Text, View} from 'react-native'

type Props = {
  children: string
}

export const SectionHeader: React.FC<Props> = ({children}) => {
  return (
    <View className="bg-primary px-2 py-1">
      <Text className="font-bold text-white">{children}</Text>
    </View>
  )
}
