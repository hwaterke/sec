// @flow
import React from 'react';
import type {ResourceDefinition} from '../types/ResourceDefinition';

export const WorkoutSetResource: ResourceDefinition = {
  path: 'workout_sets',
  propType: React.PropTypes.shape({
    uuid: React.PropTypes.string.isRequired,
    repetitions: React.PropTypes.number,
    weight: React.PropTypes.number,
    time: React.PropTypes.string,
    distance: React.PropTypes.number,
    notes: React.PropTypes.string,
    exercise_uuid: React.PropTypes.string.isRequired,
    executed_at: React.PropTypes.string.isRequired
  })
};
