import {Text} from 'react-native'

export const ErrorText = ({text}: {text: string}) => {
  return <Text className="text-red-500 text-sm">{text}</Text>
}

export const Label = ({text}: {text: string}) => {
  return <Text className="mb-1  text-sm text-gray-700">{text}</Text>
}
