import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {FieldWrapper} from './simple/FieldWrapper';
import TextInputField from './simple/TextInputField';
import axios from 'axios';
import {saveToken} from '../reducers/authentication';
import {setBackendUrl} from '../reducers/backend';
import {colors} from '../constants/colors';

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
        <View style={styles.loginView}>
          <FieldWrapper>
            <Field
              name="backend"
              component={TextInputField}
              placeholder="Backend"
            />
          </FieldWrapper>

          <FieldWrapper>
            <Field
              name="email"
              component={TextInputField}
              placeholder="Email"
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
            onPress={this.props.handleSubmit(this.onSubmit)}
            title="Login"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.headerColor,
  },
  loginView: {
    paddingVertical: 20,

    backgroundColor: '#fafafa',
    borderColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
