import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-join-room-form',
  imports: [MatInput, ReactiveFormsModule, MatButtonModule],
  templateUrl: './join-room-form.html',
  styleUrl: './join-room-form.css',
})
export class JoinRoomForm {
  readonly roomId = new FormControl<string>('', { nonNullable: true });

  handleJoinRoom(event: Event) {
    event.preventDefault();
  }
}
