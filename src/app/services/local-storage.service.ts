import { Injectable } from '@angular/core'
import { User } from '../data/interfaces/users.interface'

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public readonly USERS_KEY: string = 'users'

  public getUser(USERS_KEY: string): User[] | null {
    const localUsers: string | null = localStorage.getItem(this.USERS_KEY)
    let result: User[] | null = null
    try {
      if (localUsers) result = JSON.parse(localUsers)
    } catch (error) {
      console.error('Ошибка парсинга пользователей из localStorage:', error)
    }
    return result
  }

  public setUser(users: User[]): void {
    try {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Ошибка при сохранении данных в localStorage:', error)
    }
  }

  public removeUser(): void {
    localStorage.removeItem(this.USERS_KEY)
  }
}
