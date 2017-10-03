// @flow
import PropTypes from 'prop-types';
import type {ResourceDefinition} from 'hw-react-shared';

export const ExerciseResource: ResourceDefinition = {
  path: 'exercises',
  propType: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    repetitions: PropTypes.bool,
    weight: PropTypes.bool,
    time: PropTypes.bool,
    distance: PropTypes.bool,
    description: PropTypes.string
  })
};
