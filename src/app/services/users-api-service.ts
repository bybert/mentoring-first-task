import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../data/interfaces/users.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  usersApiUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}`)
  }
}
