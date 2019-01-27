import PropTypes from 'prop-types'

export const ExerciseResource = {
  name: 'exercises',
  key: 'uuid',

  defaultPath: 'exercises',

  propType: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    main_muscle: PropTypes.string,

    cardio: PropTypes.bool,
    is_machine: PropTypes.bool,
    with_dumbbell: PropTypes.bool,
    with_barbell: PropTypes.bool,

    repetitions: PropTypes.bool,
    weight: PropTypes.bool,
    time: PropTypes.bool,
    distance: PropTypes.bool,
  }),
}
