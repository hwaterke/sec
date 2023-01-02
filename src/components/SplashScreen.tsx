import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components/native'

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffc400;
`

export const SplashScreen: React.FC = () => {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}
