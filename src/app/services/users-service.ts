import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { User } from '../data/interfaces/users.interface'
import { UsersApiService } from './users-api-service'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  private userApiService = inject(UsersApiService)
  public readonly users$ = this.usersSubject$.asObservable()
  private localStorageService = inject(LocalStorageService)

  private generateNextId(): number {
    if (this.usersSubject$.value.length === 0) {
      return 1
    }
    const maxId = Math.max(...this.usersSubject$.value.map(user => user.id))
    return maxId + 1
  }

  public deleteUser(id: number): void {
    const updatedUsers = this.usersSubject$.value.filter((user) => user.id !== id)
    this.usersSubject$.next(updatedUsers)
    this.localStorageService.setUser(updatedUsers)
  }

  public loadUsers(): void {
    const localUsers: User[] | null = this.localStorageService.getUser(this.localStorageService.USERS_KEY)
    if (localUsers) {
      this.usersSubject$.next(localUsers)
    } else {
      this.userApiService.getUsers().subscribe({
        next: (users: User[]) => {
          this.usersSubject$.next(users)
          this.localStorageService.setUser(users)
        },
        error: (error) => {
          console.error('Ошибка при загрузке пользователей:', error)
        },
      })
    }
  }

  public updateUser(updatedUser: User): void {
    const users: User[] = this.usersSubject$.value || []
    const updatedUsers: User[] = this.usersSubject$.value.map(user =>
      user.id === updatedUser.id ? updatedUser : user,
    )
    this.usersSubject$.next(updatedUsers)
    this.localStorageService.setUser(updatedUsers)
  }

  public addUser(newUser: User): void {
    const newUsers: User[] = [
      ...this.usersSubject$.value,
      { ...newUser, id: this.generateNextId() },
    ]
    this.usersSubject$.next(newUsers)
    this.localStorageService.setUser(newUsers)
  }
}
