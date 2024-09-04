import { createReducer, on } from '@ngrx/store'
import { IUsersState } from '../../data/interfaces/usersState.interface'
import { UsersState } from './users.state'
import * as UsersActions from './users.actions'

export const USERS_FEATURE_KEY = 'users'

export const usersReducer = createReducer(
  UsersState,
  on(UsersActions.initUsers, (state: IUsersState) => {
    return {
      ...state,
      loading: true,
      error: '',
    }
  }),

  on(UsersActions.loadUsersSuccess, (state: IUsersState, { users }) => {
    return {
      ...state,
      users,
      loading: true,
      error: '',
    }
  }),

  on(UsersActions.loadUsersFailure, (state: IUsersState, { error }) => {
    return {
      ...state,
      users: [],
      loading: false,
      error,
    }
  }),

  on(UsersActions.addUser, (state: IUsersState, { user }) => {
    return {
      ...state,
      users: [...state.users, user],
      loading: true,
      error: '',
    }
  }),
  on(UsersActions.updateUser, (state: IUsersState, { user }) => {
    return {
      ...state,
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    }
  }),

  on(UsersActions.deleteUser, (state: IUsersState, { userId }) => {
    return {
      ...state,
      users: state.users.filter((u) => u.id !== userId),
      loading: true,
      error: '',
    }
  })
)
