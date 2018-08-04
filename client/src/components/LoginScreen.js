import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-native'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import axios from 'axios'
import {saveToken} from '../reducers/authentication'
import {setBackendUrl} from '../reducers/backend'
import {FieldWrapper} from './simple/FieldWrapper'
import {TextInputField} from './simple/TextInputField'
import {Screen} from './dumb/Screen'

@connect(state => ({
  initialValues: {
    backend: state.backend,
  },
}))
@reduxForm({form: 'login', enableReinitialize: true})
export class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  onSubmit = data => {
    this.performLogin(data.backend, data.email, data.password)
    this.props.dispatch(setBackendUrl(data.backend))
  }

  performLogin = (backend, email, password) => {
    axios({
      url: `${backend}/login`,
      method: 'POST',
      data: {
        email,
        password,
      },
    })
      .then(response => {
        if (response.headers.authorization) {
          // Dispatch save token
          this.props.dispatch(saveToken(response.headers.authorization))
        } else {
          alert('Login error')
        }
      })
      .catch(err => alert('Login error: ' + err.toString()))
  }

  render() {
    return (
      <Screen padding>
        <FieldWrapper>
          <Field
            name="backend"
            component={TextInputField}
            placeholder="Backend"
            autoCapitalize="none"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Field
            name="email"
            component={TextInputField}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Field
            name="password"
            component={TextInputField}
            placeholder="Password"
            secureTextEntry
          />
        </FieldWrapper>

        <Button
          title="Login"
          onPress={this.props.handleSubmit(this.onSubmit)}
        />
      </Screen>
    )
  }
}
