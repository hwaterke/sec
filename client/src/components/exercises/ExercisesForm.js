// @flow
import React from 'react';
import {Button, View, Alert} from 'react-native';
import {Field} from 'redux-form';
import TextInputField from '../simple/TextInputField';
import {resourceForm} from '../../api/resourceForm';
import {SwitchField} from '../simple/SwitchField';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {FieldWrapper} from '../simple/FieldWrapper';
import {JsonDebug} from '../simple/JsonDebug';

class ExercisesForm extends React.Component {
  static propTypes = {
    updatedResource: ExerciseResource.propType,
    handleSubmit: React.PropTypes.func.isRequired,
    deleteResource: React.PropTypes.func,
    isUpdate: React.PropTypes.bool.isRequired
  };

  render() {
    return (
      <View>

        <FieldWrapper label="Name">
          <Field
            name="name"
            component={TextInputField}
            placeholder="Name"
          />
        </FieldWrapper>

        <Field
          name="repetitions"
          component={SwitchField}
          label="Repetitions"
        />

        <Field
          name="weight"
          component={SwitchField}
          label="Weight"
        />

        <Field
          name="time"
          component={SwitchField}
          label="Time"
        />

        <Field
          name="distance"
          component={SwitchField}
          label="Distance"
        />

        <FieldWrapper label="Description">
          <Field
            name="description"
            component={TextInputField}
            placeholder="Description"
            multiline
          />
        </FieldWrapper>

        <Button
          title="Save"
          onPress={this.props.handleSubmit}
        />

        {
          this.props.isUpdate &&
          <Button
            title="Delete"
            onPress={() => Alert.alert(
              'Delete',
              null,
              [
                {text: 'Delete', onPress: this.props.deleteResource},
                {text: 'Cancel'}
              ]
            )}
          />
        }

        {this.props.isUpdate && <JsonDebug value={this.props.updatedResource} />}

      </View>
    );
  }
}

export default resourceForm(ExerciseResource.path)(ExercisesForm);
