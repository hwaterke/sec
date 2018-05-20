import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {Button} from 'react-native';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {FieldWrapper} from './simple/FieldWrapper';
import {TextInputField} from './simple/TextInputField';
import {Screen} from './dumb/Screen';

@connect(state => ({
  initialValues: {
    backend: state.backend
  }
}))
@reduxForm({form: 'login', enableReinitialize: true})
export class LoginScreen extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  onSubmit = data => {
    this.performLogin(data.email, data.password);
  };

  performLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .finally(this.props.reset);
  };

  render() {
    return (
      <Screen padding>
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
    );
  }
}
