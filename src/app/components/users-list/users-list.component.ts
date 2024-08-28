import { Component, inject } from '@angular/core'
import { UsersService } from '../../services/users-service'
import { AsyncPipe, NgForOf } from '@angular/common'
import { UserCardComponent } from '../user-card/user-card.component'
import { UsersApiService } from '../../services/users-api-service'
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button'
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { User } from '../../data/interfaces/users.interface'

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgForOf, UserCardComponent, AsyncPipe, MatMiniFabButton, MatButton, MatFabButton, MatGridList, MatGridTile],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  private usersService = inject(UsersService)
  private usersApiService = inject(UsersApiService)
  public readonly users$ = this.usersService.users$
  private dialog = inject(MatDialog)
  private dialogRef: any
  private dialogForm: any
  private user: any

  constructor() {
  }

  ngOnInit() {
    this.usersService.loadUsers()
  }

  public onDeleteUser(id: number): void {
    this.usersService.deleteUser(id)
  }

  public openAddDialog() {
    const dialogRef: MatDialogRef<CreateEditUserComponent> = this.dialog.open(
      CreateEditUserComponent, {
        width: '40%',
        data: {
          isEdit: true,
        },
      })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(this.user)
      }
    })
  }

  public openEditDialog(user: User): void {
    const dialogRef: MatDialogRef<CreateEditUserComponent> = this.dialog.open(
      CreateEditUserComponent, {
        width: '40%',
        data: user,
      })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(this.user)
      }
    })
  }
}
