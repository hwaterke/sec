import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {FieldWrapper} from './simple/FieldWrapper';
import TextInputField from './simple/TextInputField';
import axios from 'axios';
import {saveToken} from '../reducers/authentication';
import {setBackendUrl} from '../reducers/backend';
import {Button, Text} from '@shoutem/ui';
import {Components} from 'exponent';

@connect(state =>
  ({
    initialValues: {
      backend: state.backend
    }
  })
)
@reduxForm({form: 'login', enableReinitialize: true})
export class LoginScreen extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  };

  onSubmit = (data) => {
    this.performLogin(data.backend, data.email, data.password);
    this.props.dispatch(setBackendUrl(data.backend));
  };

  performLogin = (backend, email, password) => {
    axios({
      url: `${backend}/login`,
      method: 'POST',
      data: {
        email,
        password
      }
    }).then(response => {
      if (response.headers.authorization) {
        // Dispatch save token
        this.props.dispatch(saveToken(response.headers.authorization));
      } else {
        alert('Login error');
      }
    }).catch(err => alert('Login error: ' + err.toString()));
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../assets/dbg.jpg')}
        />

        <Components.BlurView tint="default" intensity={50} style={[StyleSheet.absoluteFill, styles.gradient]}>
          <FieldWrapper>
            <Field
              name="backend"
              component={TextInputField}
              placeholder="Backend"
              autoCapitalize="none"
              style={{backgroundColor: 'rgba(0,0,0,.4)'}}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Field
              name="email"
              component={TextInputField}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={{backgroundColor: 'rgba(0,0,0,.4)'}}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Field
              name="password"
              component={TextInputField}
              placeholder="Password"
              secureTextEntry
              style={{backgroundColor: 'rgba(0,0,0,.4)'}}
            />
          </FieldWrapper>

          <Button
            styleName="sm-gutter dark"
            onPress={this.props.handleSubmit(this.onSubmit)}
          >
            <Text>Login</Text>
          </Button>
        </Components.BlurView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  }
});
