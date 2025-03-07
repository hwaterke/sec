import {isEmpty, isNullish} from 'remeda'

export const nilAndEmptyToNull = (value: string | null | undefined) => {
  if (isNullish(value) || isEmpty(value)) {
    return null
  }
  return value
}
