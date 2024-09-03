import { Component, inject, OnInit } from '@angular/core'
import { UsersService } from '../../services/users-service'
import { AsyncPipe } from '@angular/common'
import { UserCardComponent } from '../user-card/user-card.component'
import { MatButton, MatFabButton } from '@angular/material/button'
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { User } from '../../data/interfaces/users.interface'
import { ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ReactiveFormsModule, UserCardComponent, AsyncPipe, MatButton, MatFabButton, MatGridList, MatGridTile],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService)
  public readonly users$: Observable<User[]> = this.usersService.users$
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.usersService.loadUsers()
  }

  public onDeleteUser(id: number): void {
    this.usersService.deleteUser(id)
  }

  public openDialog(user?: User): void {
    const dialogRef: MatDialogRef<CreateEditUserComponent> = this.dialog.open(CreateEditUserComponent, {
      width: '40%',
      data: { user: user || {}, isEdit: !!user },
    })
    dialogRef.afterClosed().subscribe((newUser) => {
      if (user) {
        this.usersService.updateUser(newUser)
      } else {
        this.usersService.addUser(newUser)
      }
    })
  }
}
