import {Link, Stack} from 'expo-router'
import {SafeAreaView, Text} from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <SafeAreaView>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  )
}
