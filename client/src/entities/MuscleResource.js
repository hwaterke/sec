// @flow
import React from 'react';
import type {ResourceDefinition} from '../types/ResourceDefinition';

export const MuscleResource: ResourceDefinition = {
  path: 'muscles',
  propType: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    muscle: React.PropTypes.string,
    upper_body: React.PropTypes.bool
  })
};
