import React from 'react'
import {Button, View} from 'react-native'
import {Formik} from 'formik'
import {TextInput} from '../../components/TextInput'
import {useLoginMutation} from '../../graphql/graphql.codegen'
import {useDispatch} from 'react-redux'
import {setToken} from '../../redux/reducers/tokenReducer'

export const SignInScreen: React.FC = () => {
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  return (
    <View>
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
            <Button onPress={handleSubmit as any} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  )
}
