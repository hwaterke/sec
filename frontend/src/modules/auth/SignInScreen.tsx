import {gql} from '@apollo/client'
import {Formik} from 'formik'
import React from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components/native'
import {Button} from '../../components/Button'
import {TextInput} from '../../components/TextInput'
import {mt} from '../../design/constants/spacing'
import {Screen} from '../../design/layout/Screen'
import {useLoginMutation} from '../../graphql/graphql.codegen'
import {clearBackend} from '../../redux/reducers/backendReducer'
import {setToken} from '../../redux/reducers/tokenReducer'
import {selectBackend} from '../../redux/selectors/backend'

const SmallText = styled.Text`
  font-size: 10px;
`

const BackendView = styled.View`
  ${mt(10)};
`

gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        firstName
        lastName
      }
      token
    }
  }
`

export const SignInScreen: React.FC = () => {
  const backend = useSelector(selectBackend)
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  return (
    <Screen withPadding>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={async ({email, password}) => {
          try {
            const {data} = await login({variables: {email, password}})

            if (data) {
              dispatch(setToken(data.login.token))
            } else {
              alert('Login error. No data')
            }
          } catch (err) {
            alert('Login error ' + err)
          }
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              textContentType="emailAddress"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
            />

            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry
              placeholder="Password"
            />
            <Button onPress={handleSubmit as any} withTopMargin>
              Login
            </Button>
          </View>
        )}
      </Formik>

      <BackendView>
        <SmallText>Backend: {backend}</SmallText>
        <Button onPress={() => dispatch(clearBackend())} withTopMargin>
          Change backend URL
        </Button>
      </BackendView>
    </Screen>
  )
}
