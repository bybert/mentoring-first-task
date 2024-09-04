import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap } from 'rxjs'
import { UsersApiService } from '../../services/users-api-service'
import { initUsers, loadUsersFailure, loadUsersSuccess } from './users.actions'

export const loadUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions)
    const api = inject(UsersApiService)
    return actions$.pipe(
      ofType(initUsers),
      switchMap(() => {
        return api.getUsers().pipe(
          map((users) => {
            return loadUsersSuccess({ users })
          }),
          catchError((error) => {
            return of(loadUsersFailure({ error }))
          })
        )
      })
    )
  },
  { functional: true }
)
