import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/services';
import { FormSubmitButton } from '@src/app/shared/components/form-submit-button/form-submit-button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormSubmitButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly fieldStyle = 'grid gap-2';

  readonly processing = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  name = new FormControl<string>('', { nonNullable: true });
  email = new FormControl<string>('', { nonNullable: true });
  password = new FormControl<string>('', { nonNullable: true });
  confirmPassword = new FormControl<string>('', { nonNullable: true });

  handleSubmit(event: Event) {
    event.preventDefault();
    this.authService
      .register({
        name: this.name.value,
        password: this.password.value,
        email: this.email.value,
        confirmPassword: this.confirmPassword.value,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
          this.authService.user.set(res.user);
          this.router.navigate(['/']);
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Registration failed: ' + err?.error?.errorMessage);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
