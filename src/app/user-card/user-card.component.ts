import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { User } from '../user.interface';
import {UsersService} from "../users.service";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogModule} from "@angular/material/dialog";
import {UserEditComponent} from "../user-edit/user-edit.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})

export class UserCardComponent {
  private usersService!: UsersService;
  constructor(private matDialog: MatDialog) {
  }

  @Output() deleteUser: EventEmitter<number> = new EventEmitter()
  @Input({required: true}) user!: User;

  onDeleteUser(id: number) {
    this.deleteUser.emit(id)
    this.usersService.saveData()
  }

  openDialogEdit(user:User): void {
    const dialogRef =this.matDialog.open(UserEditComponent, {
      width: '360px',
      data: user
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
