import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/core/services';
import { tap } from 'rxjs';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgxSkeletonLoaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  readonly user = this.authService.user;

  logout() {
    return this.authService
      .logout()
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.authService.user.set(null);
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
