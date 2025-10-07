import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { ApiService } from '@src/app/core/services/api.service';
import { AuthService } from '@src/app/core/services';
import { User } from '@src/app/shared/models/user.model';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private api = inject(ApiService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.api
      .get('/user/get-user')
      .pipe(
        tap((res) => {
          this.authService.user.set(res as User);
        }),
        catchError((err) => {
          this.authService.user.set(null); // user not authenticated
          return EMPTY;
        })
      )
      .subscribe();
  }
}
