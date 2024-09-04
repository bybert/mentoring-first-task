import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IUsersState } from '../../data/interfaces/usersState.interface'
import { USERS_FEATURE_KEY } from './users.reducers'

export const selectFeature = createFeatureSelector<IUsersState>(USERS_FEATURE_KEY)

export const selectUsers = createSelector(
  selectFeature,
  state => state.users,
)
