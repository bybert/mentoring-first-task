import {Component, EventEmitter, Input, Output} from '@angular/core'
import {User} from '../../data/interfaces/users.interface'
import {MatFabButton} from '@angular/material/button'
import {MatCard, MatCardContent} from '@angular/material/card'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatFabButton,
    MatCard,
    MatCardContent,
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
