import React, {PropsWithChildren} from 'react'
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native'

type Props = {
  onPress: (event: GestureResponderEvent) => void
  className?: string
}

export const Button = ({
  onPress,
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex items-center justify-center bg-gray-600 rounded-lg p-4 ${className}`}
    >
      <Text className="text-white text-base font-bold">{children}</Text>
    </TouchableOpacity>
  )
}
