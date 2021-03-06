import {css} from 'styled-components/native'

export type SpacingScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// Change this implementation if we want to change the scale
export const getSpacingValue = (scale: SpacingScale) => scale * 4

export const ml = (scale: SpacingScale) => css`
  margin-left: ${getSpacingValue(scale)}px;
`

export const mr = (scale: SpacingScale) => css`
  margin-right: ${getSpacingValue(scale)}px;
`

export const mt = (scale: SpacingScale) => css`
  margin-top: ${getSpacingValue(scale)}px;
`

export const mb = (scale: SpacingScale) => css`
  margin-bottom: ${getSpacingValue(scale)}px;
`

export const mx = (scale: SpacingScale) => css`
  ${ml(scale)};
  ${mr(scale)};
`

export const my = (scale: SpacingScale) => css`
  ${mt(scale)};
  ${mb(scale)};
`

export const pl = (scale: SpacingScale) => css`
  padding-left: ${getSpacingValue(scale)}px;
`

export const pr = (scale: SpacingScale) => css`
  padding-right: ${getSpacingValue(scale)}px;
`

export const pt = (scale: SpacingScale) => css`
  padding-top: ${getSpacingValue(scale)}px;
`

export const pb = (scale: SpacingScale) => css`
  padding-bottom: ${getSpacingValue(scale)}px;
`

export const px = (scale: SpacingScale) => css`
  ${pl(scale)};
  ${pr(scale)};
`

export const py = (scale: SpacingScale) => css`
  ${pt(scale)};
  ${pb(scale)};
`
