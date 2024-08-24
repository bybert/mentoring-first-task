import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from 'rxjs'
import {User} from '../data/interfaces/users.interface'
import {UsersApiService} from './users-api-service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]) //создали реактивное состояние, которое инициализировали пустым массивом, которое будет лежать в BehaviorSubject
  public readonly users$ = this.usersSubject$.asObservable() //создали возможность считывать это состояние из внешних классов

  constructor(private http: HttpClient, private userApiService: UsersApiService) {
  }

  setUsers(users: User[]) {
    return this.usersSubject$.next(users)
  }

  deleteUser(id: number): void {
    this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id))
  }

  loadUsers(): void {
    this.userApiService.getUsers().subscribe(
      (data: User[]) => {
        this.usersSubject$.next(data)
      })
  }
}

