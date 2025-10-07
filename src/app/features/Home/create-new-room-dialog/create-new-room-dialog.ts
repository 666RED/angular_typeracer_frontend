import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-new-room-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './create-new-room-dialog.html',
  styleUrl: './create-new-room-dialog.css',
})
export class CreateNewRoomDialog {
  readonly fieldClass = 'grid grid-cols-2 gap-x-4';
  selected = '2';

  createNewRoomForm = new FormGroup({
    roomId: new FormControl<string>(uuidv4(), { nonNullable: true }),
    roomName: new FormControl<string>('', { nonNullable: true }),
    playerCount: new FormControl<string>('2', { nonNullable: true }),
    private: new FormControl<boolean>(false, { nonNullable: true }),
  });

  createNewRoom(event: Event) {
    event.preventDefault();
    console.log(this.createNewRoomForm.value);
  }
}
