import { Component, inject } from '@angular/core';
import { JoinRoomForm } from '../join-room-form/join-room-form';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewRoomDialog } from '@src/app/features/Home/create-new-room-dialog/create-new-room-dialog';

@Component({
  selector: 'app-landing',
  imports: [JoinRoomForm],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  readonly dialog = inject(MatDialog);

  openCreateNewRoomDialog() {
    this.dialog.open(CreateNewRoomDialog);
  }
}
