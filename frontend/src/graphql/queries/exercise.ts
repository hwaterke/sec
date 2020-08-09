import {gql} from 'apollo-boost'

export const EXERCISES_QUERY = gql`
  query exercises {
    exercises {
      uuid
      name
      muscle
    }
  }
`
