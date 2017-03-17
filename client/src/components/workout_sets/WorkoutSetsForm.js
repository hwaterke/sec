// @flow
import React from 'react';
import {Alert} from 'react-native';
import {resourceForm} from '../../api/resourceForm';
import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {exercisesByIdSelector} from '../../selectors/exercices';
import TextInputField from '../simple/TextInputField';
import {lastWorkoutSetByExerciseSelector} from '../../selectors/workout_sets';
import NumberInputField from '../simple/NumberInputField';
import moment from 'moment';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {fromKilo, toKilo} from '../../utils/conversion';
import {JsonDebug} from '../simple/JsonDebug';
import {FieldWrapper} from '../simple/FieldWrapper';
import {NumberInputWithButtonsField} from '../simple/NumberInputWithButtonsField';
import {View, Button, Text, Title} from '@shoutem/ui';
import {ExerciseResource} from '../../entities/ExerciseResource';

const mapStateToProps = (state) => ({
  exercises: exercisesByIdSelector(state),
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state)
});

@connect(mapStateToProps)
class WorkoutSetsForm extends React.Component {
  static propTypes = {
    exercise_uuid: React.PropTypes.string.isRequired,
    updatedResource: WorkoutSetResource.propType,
    handleSubmit: React.PropTypes.func.isRequired,
    deleteResource: React.PropTypes.func,
    autofill: React.PropTypes.func,
    isUpdate: React.PropTypes.bool.isRequired,
    exercises: React.PropTypes.objectOf(ExerciseResource.propType).isRequired
  };

  render() {
    const exercise = this.props.exercises[this.props.exercise_uuid];

    if (!exercise) {
      return (<View><Text>Exercise not found</Text></View>);
    }

    return (
      <View styleName="md-gutter">

        <Title>{exercise.name}</Title>

        <FieldWrapper label="When">
          <Field
            name="executed_at"
            component={TextInputField}
            placeholder="When"
          />
        </FieldWrapper>

        {
          exercise.repetitions &&
          <FieldWrapper label="Repetitions">
            <Field
              name="repetitions"
              component={NumberInputWithButtonsField}
              placeholder="Repetitions"
            />
          </FieldWrapper>
        }

        {
          exercise.weight &&
          <FieldWrapper label="Weight">
            <Field
              name="weight"
              component={NumberInputWithButtonsField}
              placeholder="Weight"
            />
          </FieldWrapper>
        }

        {
          exercise.time &&
          <FieldWrapper label="Time">
            <Field
              name="time"
              component={TextInputField}
              placeholder="Time"
            />
          </FieldWrapper>
        }

        {
          exercise.distance &&
          <FieldWrapper label="Distance">
            <Field
              name="distance"
              component={NumberInputField}
              placeholder="Distance"
            />
          </FieldWrapper>
        }

        <FieldWrapper label="Notes">
          <Field
            name="notes"
            component={TextInputField}
            placeholder="Notes"
            multiline
          />
        </FieldWrapper>

        <Button onPress={this.props.handleSubmit}>
          <Text>Save</Text>
        </Button>

        {
          this.props.isUpdate &&
          <Button
            onPress={() => Alert.alert(
              'Delete',
              null,
              [
                {text: 'Delete', onPress: this.props.deleteResource},
                {text: 'Cancel'}
              ]
            )}
          >
            <Text>Delete</Text>
          </Button>
        }

        {this.props.isUpdate && <JsonDebug value={this.props.updatedResource} />}

      </View>
    );
  }
}

const formToResource = (formData) => {
  const resource = {...formData};
  resource.repetitions = resource.repetitions && parseInt(resource.repetitions);
  resource.weight = resource.weight && fromKilo(resource.weight);
  resource.distance = resource.distance && fromKilo(resource.distance);
  return resource;
};

const updateOrTemplate = (updatedResource, props) => {
  if (updatedResource) {
    return updatedResource;
  }
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  return {...props.templateResource, executed_at: now};
};

const resourceToForm = (updatedResource, props) => {
  const resource = {...updateOrTemplate(updatedResource, props)};
  resource.repetitions = resource.repetitions && resource.repetitions.toString();
  resource.weight = resource.weight && toKilo(resource.weight).toString();
  resource.distance = resource.distance && toKilo(resource.distance).toString();
  return resource;
};

export default resourceForm(
  WorkoutSetResource.path,
  formToResource,
  resourceToForm
)(WorkoutSetsForm);
