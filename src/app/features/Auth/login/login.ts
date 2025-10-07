import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@src/app/core/services';
import { FormSubmitButton } from '@src/app/shared/components/form-submit-button/form-submit-button';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormSubmitButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly fieldStyle = 'grid gap-2';

  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  email = new FormControl<string>('');
  password = new FormControl<string>('');

  readonly processing = signal(false);

  handleSubmit(event: Event) {
    event.preventDefault();
    const email = this.email.value ?? '';
    const password = this.password.value ?? '';

    this.authService
      .login({ email, password })
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
