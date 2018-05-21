// @flow
import PropTypes from 'prop-types'
import type {ResourceDefinition} from 'hw-react-shared'

export const WorkoutSetResource: ResourceDefinition = {
  path: 'workout_sets',
  propType: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    repetitions: PropTypes.number,
    weight: PropTypes.number,
    time: PropTypes.string,
    distance: PropTypes.number,
    notes: PropTypes.string,
    exercise_uuid: PropTypes.string.isRequired,
    executed_at: PropTypes.string.isRequired,
  }),
}
