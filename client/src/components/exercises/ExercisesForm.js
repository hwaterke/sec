import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, View} from 'react-native';
import {TextInputField} from '../simple/TextInputField';
import {SwitchField} from '../simple/SwitchField';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {FieldWrapper} from '../simple/FieldWrapper';
import {JsonDebug} from '../simple/JsonDebug';
import {MuscleSelectField} from '../simple/MuscleSelectField';
import {Field, Form} from 'react-final-form';

export class ExercisesForm extends React.Component {
  static propTypes = {
    updatedResource: ExerciseResource.propType,
    handleSubmit: PropTypes.func.isRequired,
    deleteResource: PropTypes.func,
    isUpdate: PropTypes.bool
  };

  render() {
    const {handleSubmit: propsSubmit} = this.props;
    return (
      <Form
        onSubmit={propsSubmit}
        render={({handleSubmit}) => (
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

            <Field name="weight" component={SwitchField} label="Weight" />

            <Field name="time" component={SwitchField} label="Time" />

            <Field name="distance" component={SwitchField} label="Distance" />

            <FieldWrapper label="Main muscle">
              <Field name="main_muscle" component={MuscleSelectField} />
            </FieldWrapper>

            <Field name="cardio" component={SwitchField} label="Cardio" />

            <Field name="is_machine" component={SwitchField} label="Machine" />

            <Field
              name="with_dumbbell"
              component={SwitchField}
              label="Dumbbell"
            />

            <Field
              name="with_barbell"
              component={SwitchField}
              label="Barbell"
            />

            <FieldWrapper label="Description">
              <Field
                name="description"
                component={TextInputField}
                placeholder="Description"
                multiline
              />
            </FieldWrapper>

            <Button title="Save" onPress={handleSubmit} />

            {this.props.isUpdate && (
              <Button
                title="Delete"
                onPress={() =>
                  Alert.alert('Delete', null, [
                    {text: 'Delete', onPress: this.props.deleteResource},
                    {text: 'Cancel'}
                  ])}
              />
            )}

            {this.props.isUpdate && (
              <JsonDebug value={this.props.updatedResource} />
            )}
          </View>
        )}
      />
    );
  }
}
