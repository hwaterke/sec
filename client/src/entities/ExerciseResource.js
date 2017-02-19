// @flow
import React from 'react';
import type {ResourceDefinition} from '../types/ResourceDefinition';

export const ExerciseResource: ResourceDefinition = {
  path: 'exercises',
  propType: React.PropTypes.shape({
    uuid: React.PropTypes.string.isRequired,
    repetitions: React.PropTypes.bool,
    weight: React.PropTypes.bool,
    time: React.PropTypes.bool,
    distance: React.PropTypes.bool,
    description: React.PropTypes.string
  })
};
