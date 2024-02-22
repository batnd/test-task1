import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens/api-url.token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = inject(API_URL);

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }
}
