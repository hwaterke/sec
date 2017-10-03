// @flow
import PropTypes from 'prop-types';
import type {ResourceDefinition} from 'hw-react-shared';

export const MuscleResource: ResourceDefinition = {
  path: 'muscles',
  key: 'name',
  propType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    muscle: PropTypes.string,
    upper_body: PropTypes.bool
  })
};
