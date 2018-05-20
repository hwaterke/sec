import PropTypes from 'prop-types';

export const MuscleResource = {
  path: 'muscles',
  key: 'name',
  propType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    muscle: PropTypes.string,
    upper_body: PropTypes.bool
  })
};
