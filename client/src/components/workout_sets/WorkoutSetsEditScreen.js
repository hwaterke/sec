import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {select} from 'redux-crud-provider';
import {WorkoutSetResource} from '../../entities/WorkoutSetResource';
import {ResourceFormProvider} from '../../providers/ResourceFormProvider';
import {crudThunks} from '../../thunks/crudThunks';
import {Screen} from '../dumb/Screen';
import {
  WorkoutSetsForm,
  workoutSetsFormToResource,
  workoutSetsResourceToForm
} from './WorkoutSetsForm';

@connect(state => ({workoutSetsById: select(WorkoutSetResource).byId(state)}))
export class WorkoutSetsEditScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired
    }).isRequired,
    workoutSetsById: PropTypes.objectOf(WorkoutSetResource.propType).isRequired
  };

  render() {
    return (
      <Screen scroll padding>
        <ResourceFormProvider
          crudThunks={crudThunks}
          uuid={this.props.navigation.state.params.resourceId}
          resource={WorkoutSetResource}
          formToResource={workoutSetsFormToResource}
          resourceToForm={workoutSetsResourceToForm}
          postAction={() => this.props.navigation.goBack()}
        >
          {props => (
            <WorkoutSetsForm
              {...props}
              exercise_uuid={props.entity.exercise_uuid}
            />
          )}
        </ResourceFormProvider>
      </Screen>
    );
  }
}
