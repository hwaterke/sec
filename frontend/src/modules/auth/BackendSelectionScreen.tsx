import {Formik} from 'formik'
import React from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '../../components/Button'
import {TextInput} from '../../components/TextInput'
import {Screen} from '../../design/layout/Screen'
import {setBackend} from '../../redux/reducers/backendReducer'
import {selectBackend} from '../../redux/selectors/backend'

export const BackendSelectionScreen = () => {
  const backend = useSelector(selectBackend)
  const dispatch = useDispatch()

  return (
    <Screen withPadding>
      <Formik
        initialValues={{backend: backend ?? ''}}
        onSubmit={(values) => {
          dispatch(setBackend(values.backend))
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              onChangeText={handleChange('backend')}
              onBlur={handleBlur('backend')}
              value={values.backend}
              autoCapitalize="none"
              keyboardType="url"
              textContentType="URL"
              placeholder="URL"
            />

            <Button withTopMargin onPress={handleSubmit as any}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </Screen>
  )
}
