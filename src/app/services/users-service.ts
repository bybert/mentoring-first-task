import { inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '../data/interfaces/users.interface'
import { UsersApiService } from './users-api-service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  private userApiService = inject(UsersApiService)
  public readonly users$ = this.usersSubject$.asObservable()

  private generateNextId(): number {
    const users = this.usersSubject$.value
    if (users.length === 0) {
      return 1
    }
    const maxId = Math.max(...users.map(user => user.id))
    return maxId + 1
  }


  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter((user) => user.id !== id))
  }

  loadUsers(): void {
    this.userApiService.getUsers().subscribe((data: User[]) => {
      this.usersSubject$.next(data)
    })
  }

  updateUser(updateUser: User): void {
    const updatedUsers = this.usersSubject$.value.map(user =>
      user.id === updateUser.id ? updateUser : user,
    )
    this.usersSubject$.next(updatedUsers)
  }

  addUser(newUser: User): void {
    const nextId = this.generateNextId()
    const newUserWithId = { ...newUser, id: nextId }
    const currentUsers = this.usersSubject$.value
    this.usersSubject$.next([...currentUsers, newUserWithId])
  }

}
