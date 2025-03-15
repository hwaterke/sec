import {Text} from 'react-native'

export const Badge = ({text}: {text: string}) => {
  return (
    <Text className="text-xs bg-white border border-gray-300 rounded-md p-1">
      {text}
    </Text>
  )
}
