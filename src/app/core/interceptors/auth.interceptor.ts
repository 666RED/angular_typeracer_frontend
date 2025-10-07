import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@src/app/core/services';
import { catchError, switchMap, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true, // send cookies
  });

  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((err) => {
      // resend request if unauthorized
      if (err.status === 401 && !request.url.includes('/auth/refresh-token')) {
        return authService.refreshToken().pipe(
          tap((res) => {
            localStorage.setItem('token', res.accessToken);
          }),
          switchMap((res) => {
            const newRequest = request.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` },
            });
            return next(newRequest);
          }),
          catchError(err => {
            authService.logout();
            return throwError(() => err)
          })
        );
      }
      return throwError(() => err);
    })
  );
};
