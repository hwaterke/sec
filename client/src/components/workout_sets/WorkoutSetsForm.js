import React from 'react';
import PropTypes from 'prop-types';
import {byIdSelector} from 'hw-react-shared';
import moment from 'moment';
import {Alert, Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {ExerciseResource} from '../../entities/ExerciseResource';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {lastWorkoutSetByExerciseSelector} from '../../selectors/workout_sets';
import {fromKilo, toKilo} from '../../utils/conversion';
import {FieldWrapper} from '../simple/FieldWrapper';
import {JsonDebug} from '../simple/JsonDebug';
import {TextInputField} from '../simple/TextInputField';
import {Title} from '../dumb/Title';

// eslint-disable-next-line no-unused-vars
const formToResource = formData => {
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

  // Delete the uuid to make sure we do not replace the existing one.
  const cleanTemplate = {...props.templateResource, executed_at: now};
  delete cleanTemplate.uuid;

  return cleanTemplate;
};

// eslint-disable-next-line no-unused-vars
const resourceToForm = (updatedResource, props) => {
  const resource = {...updateOrTemplate(updatedResource, props)};
  resource.repetitions =
    resource.repetitions && resource.repetitions.toString();
  resource.weight = resource.weight && toKilo(resource.weight).toString();
  resource.distance = resource.distance && toKilo(resource.distance).toString();
  return resource;
};

const mapStateToProps = state => ({
  exercises: byIdSelector(ExerciseResource)(state),
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state)
});

@connect(mapStateToProps)
export class WorkoutSetsForm extends React.Component {
  static propTypes = {
    exercise_uuid: PropTypes.string.isRequired,
    updatedResource: WorkoutSetResource.propType,
    handleSubmit: PropTypes.func.isRequired,
    deleteResource: PropTypes.func,
    isUpdate: PropTypes.bool.isRequired,
    exercises: PropTypes.objectOf(ExerciseResource.propType).isRequired
  };

  render() {
    const exercise = this.props.exercises[this.props.exercise_uuid];

    if (!exercise) {
      return (
        <View>
          <Text>Exercise not found</Text>
        </View>
      );
    }

    return (
      <View>
        <Title>{exercise.name}</Title>

        <FieldWrapper label="When">
          <Field
            name="executed_at"
            component={TextInputField}
            placeholder="When"
          />
        </FieldWrapper>

        {exercise.repetitions && (
          <FieldWrapper label="Repetitions">
            <Field
              name="repetitions"
              component={TextInputField}
              keyboardType="numeric"
              placeholder="Repetitions"
            />
          </FieldWrapper>
        )}

        {exercise.weight && (
          <FieldWrapper label="Weight">
            <Field
              name="weight"
              component={TextInputField}
              keyboardType="numeric"
              placeholder="Weight"
            />
          </FieldWrapper>
        )}

        {exercise.time && (
          <FieldWrapper label="Time">
            <Field name="time" component={TextInputField} placeholder="Time" />
          </FieldWrapper>
        )}

        {exercise.distance && (
          <FieldWrapper label="Distance">
            <Field
              name="distance"
              component={TextInputField}
              keyboardType="numeric"
              placeholder="Distance"
            />
          </FieldWrapper>
        )}

        <FieldWrapper label="Notes">
          <Field
            name="notes"
            component={TextInputField}
            keyboardType="numeric"
            placeholder="Notes"
            multiline
          />
        </FieldWrapper>

        <Button title="Save" onPress={this.props.handleSubmit} />

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
    );
  }
}
