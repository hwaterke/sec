import {isEmpty, isNil} from 'ramda'

export const nilAndEmptyToNull = (value: string | null | undefined) => {
  if (isNil(value) || isEmpty(value)) {
    return null
  }
  return value
}
