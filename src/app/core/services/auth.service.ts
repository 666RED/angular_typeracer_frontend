import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '@src/app/core/services/api.service';
import { RegisterPostBody } from '@src/app/shared/models/auth.model';
import { User } from '@src/app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<User | null | undefined>(undefined);

  private api = inject(ApiService);

  register(payload: RegisterPostBody): Observable<{ user: User; accessToken: string }> {
    return this.api.post('/auth/register', payload);
  }

  login(payload: {
    email: string;
    password: string;
  }): Observable<{ user: User; accessToken: string }> {
    return this.api.post('/auth/login', payload);
  }

  logout() {
    return this.api.post('/auth/logout', {});
  }

  refreshToken() {
    return this.api.post<{ accessToken: string }>('/auth/refresh-token', {});
  }
}
