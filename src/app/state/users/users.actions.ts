import { createAction, props } from '@ngrx/store'
import { User } from '../../data/interfaces/users.interface'

export const initUsers = createAction('[Users] Load Users')
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>())
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>())

export const addUser = createAction('[Users] Add User', props<{ user: User }>())
export const updateUser = createAction('[Users] Update User', props<{ user: User }>())
export const deleteUser = createAction('[Users] Delete User', props<{ userId: number }>())
