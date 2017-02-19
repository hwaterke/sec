// @flow
import React from 'react';
import {Button, View, Alert} from 'react-native';
import {resourceForm} from '../../api/resourceForm';
import {Field, formValueSelector} from 'redux-form';
import {ExerciseSelectField} from '../simple/ExerciseSelectField';
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

const selector = formValueSelector(WorkoutSetResource.path);

const mapStateToProps = (state) => ({
  exercises: exercisesByIdSelector(state),
  lastWorkoutSetByExercise: lastWorkoutSetByExerciseSelector(state),
  exercise_uuid: selector(state, 'exercise_uuid')
});

@connect(mapStateToProps)
class WorkoutSetsForm extends React.Component {
  static propTypes = {
    updatedResource: WorkoutSetResource.propType,
    handleSubmit: React.PropTypes.func.isRequired,
    deleteResource: React.PropTypes.func,
    autofill: React.PropTypes.func,
    isUpdate: React.PropTypes.bool.isRequired
  };

  onExerciseChange = (exercise_uuid) => {
    const exercise = this.props.exercises[exercise_uuid];
    const lastSet = this.props.lastWorkoutSetByExercise[exercise_uuid];

    this.props.autofill('repetitions', (lastSet && exercise.repetitions) ? lastSet.repetitions.toString() : null);
    this.props.autofill('weight', (lastSet && exercise.weight) ? toKilo(lastSet.weight).toString() : null);
    this.props.autofill('time', (lastSet && exercise.time) ? lastSet.time : null);
    this.props.autofill('distance', (lastSet && exercise.distance) ? toKilo(lastSet.distance).toString() : null);
    this.props.autofill('notes', null);
  };

  render() {
    return (
      <View>

        <FieldWrapper label="Exercise">
          <Field
            name="exercise_uuid"
            component={ExerciseSelectField}
            onExerciseSelected={this.onExerciseChange}
          />
        </FieldWrapper>

        <FieldWrapper label="When">
          <Field
            name="executed_at"
            component={TextInputField}
            placeholder="When"
          />
        </FieldWrapper>

        {
          this.props.exercise_uuid &&
          this.props.exercises[this.props.exercise_uuid].repetitions &&
          <FieldWrapper label="Repetitions">
            <Field
              name="repetitions"
              component={NumberInputField}
              placeholder="Repetitions"
            />
          </FieldWrapper>
        }

        {
          this.props.exercise_uuid &&
          this.props.exercises[this.props.exercise_uuid].weight &&
          <FieldWrapper label="Weight">
            <Field
              name="weight"
              component={NumberInputField}
              placeholder="Weight"
            />
          </FieldWrapper>
        }

        {
          this.props.exercise_uuid &&
          this.props.exercises[this.props.exercise_uuid].time &&
          <FieldWrapper label="Time">
            <Field
              name="time"
              component={TextInputField}
              placeholder="Time"
            />
          </FieldWrapper>
        }

        {
          this.props.exercise_uuid &&
          this.props.exercises[this.props.exercise_uuid].distance &&
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
