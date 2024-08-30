import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../data/interfaces/users.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient)
  usersApiUrl = 'https://jsonplaceholder.typicode.com/users'

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersApiUrl}`)
  }
}
