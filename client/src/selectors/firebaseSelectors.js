import {createSelector} from 'reselect'

export const uidSelector = createSelector(
  firebase => firebase.auth(),
  ({currentUser}) => currentUser.uid
)
