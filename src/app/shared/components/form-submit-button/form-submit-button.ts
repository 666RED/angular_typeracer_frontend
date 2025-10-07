import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-submit-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './form-submit-button.html',
  styleUrl: './form-submit-button.css',
})
export class FormSubmitButton {
  isDisabled = input<boolean>(true);
  processing = input<boolean>(false);
  text = input<string>('');
}
