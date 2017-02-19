import React from 'react';
import {View, Button} from 'react-native';
import {Title} from './simple/Title';
import {connect} from 'react-redux';
import {setBackendUrl, setBackendPassword} from '../reducers/backend';
import {bindActionCreators} from 'redux';
import asyncActionCreatorsFor from '../api/api';
import {WorkoutSetResource} from '../entities/WorkoutSetResource';
import {ExerciseResource} from '../entities/ExerciseResource';
import {FieldWrapper} from './simple/FieldWrapper';
import TextInputField from './simple/TextInputField';

const mapStateToProps = (state) => ({
  url: state.backend.url,
  password: state.backend.password
});

const mapDispatchToProps = (dispatch) => ({
  exercicesApi: bindActionCreators(asyncActionCreatorsFor(ExerciseResource.path), dispatch),
  workoutSetsApi: bindActionCreators(asyncActionCreatorsFor(WorkoutSetResource.path), dispatch),
  dispatch: dispatch,
});

@connect(mapStateToProps, mapDispatchToProps)
export class SettingsBackendForm extends React.Component {

  static propTypes = {
    url: React.PropTypes.string,
    password: React.PropTypes.string
  };

  onPressFetch() {
    this.props.exercicesApi.fetch(this.props.url, this.props.password).then(() => {
      this.props.workoutSetsApi.fetch(this.props.url, this.props.password);
    });
  }

  render() {
    return (
      <View>
        <Title content="Backend" />

        <FieldWrapper label="URL">
          <TextInputField
            input={({
              value: this.props.url,
              onChange: (text) => this.props.dispatch(setBackendUrl(text))
            })}
            placeholder="URL"
          />
        </FieldWrapper>

        <FieldWrapper label="Password">
          <TextInputField
            input={({
              value: this.props.password,
              onChange: (text) => this.props.dispatch(setBackendPassword(text))
            })}
            secureTextEntry
          />
        </FieldWrapper>

        <Button
          onPress={() => this.props.dispatch({type:'RESET_RESOURCES'})}
          title="Clear"
        />

        <Button
          onPress={this.onPressFetch.bind(this)}
          title="Fetch"
        />
      </View>
    );
  }
}
