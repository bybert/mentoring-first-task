import {Component, EventEmitter, Input, Output} from '@angular/core'
import {UsersService} from '../../services/users-service'
import {User} from '../../data/interfaces/users.interface'
import {MatFabButton} from '@angular/material/button'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatFabButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User
  @Output() deleteUserEvent = new EventEmitter<number>()

  onDeleteUser(user: User): void {
    this.deleteUserEvent.emit(user.id)
  }
}
