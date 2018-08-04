import PropTypes from 'prop-types'

export const WorkoutSetResource = {
  name: 'workout_sets',
  key: 'uuid',

  defaultPath: 'workout_sets',

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
