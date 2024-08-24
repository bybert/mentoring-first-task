import {Component} from '@angular/core'
import {UsersService} from '../../services/users-service'
import {AsyncPipe, NgForOf} from '@angular/common'
import {UserCardComponent} from '../user-card/user-card.component'
import {UsersApiService} from '../../services/users-api-service'

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    UserCardComponent,
    AsyncPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  public readonly users$ = this.usersService.users$

  constructor(private usersService: UsersService, private usersApiService: UsersApiService) {

  }

  ngOnInit() {
    this.usersService.loadUsers()
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id)
  }
}

