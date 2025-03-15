import {TextInput, TextInputProps} from 'react-native'

export const Input = (props: TextInputProps) => {
  return (
    <TextInput
      className="h-10 px-2 bg-white border border-gray-300 rounded-md"
      {...props}
    />
  )
}

export const Textarea = (props: TextInputProps) => {
  return (
    <TextInput
      className="h-20 px-2 bg-white border border-gray-300 rounded-md"
      {...props}
      multiline
    />
  )
}
