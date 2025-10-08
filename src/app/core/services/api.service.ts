import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  get<T>(url: string, options?: { params?: HttpParams; headers?: HttpHeaders }) {
    return this.http.get<T>(`${environment.apiUrl}${url}`, { ...options, withCredentials: true });
  }

  post<T>(url: string, body: unknown, options?: { headers?: HttpHeaders }) {
    return this.http.post<T>(`${environment.apiUrl}${url}`, body, {
      ...options,
      withCredentials: true,
    });
  }

  put<T>(url: string, body: unknown, options?: { headers?: HttpHeaders }) {
    return this.http.put<T>(`${environment.apiUrl}${url}`, body, {
      ...options,
      withCredentials: true,
    });
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders }) {
    return this.http.delete<T>(`${environment.apiUrl}${url}`, {
      ...options,
      withCredentials: true,
    });
  }
}
