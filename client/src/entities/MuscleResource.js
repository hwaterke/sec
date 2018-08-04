import PropTypes from 'prop-types'

export const MuscleResource = {
  name: 'muscles',
  key: 'name',

  defaultPath: 'muscles',

  propType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    muscle: PropTypes.string,
    upper_body: PropTypes.bool,
  }),
}
