import PropTypes from 'prop-types'

export const ExerciseResource = {
  name: 'exercises',
  key: 'uuid',

  defaultPath: 'exercises',

  propType: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    repetitions: PropTypes.bool,
    weight: PropTypes.bool,
    time: PropTypes.bool,
    distance: PropTypes.bool,
    description: PropTypes.string,
  }),
}
