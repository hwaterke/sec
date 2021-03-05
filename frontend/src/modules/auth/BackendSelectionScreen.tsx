import React from 'react'
import {View, Text, Button} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Formik} from 'formik'
import {selectBackend} from '../../redux/selectors/backend'
import {TextInput} from '../../components/TextInput'
import {setBackend} from '../../redux/reducers/backendReducer'

export const BackendSelectionScreen = () => {
  const backend = useSelector(selectBackend)
  const dispatch = useDispatch()

  return (
    <View>
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

            <Button onPress={handleSubmit as any} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  )
}
