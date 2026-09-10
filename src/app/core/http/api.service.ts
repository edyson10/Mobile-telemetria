import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly baseUrl = environment.apiBaseUrl;

  constructor(
    private readonly http: HttpClient,
  ) {}

  get<T>(endpoint: string) {
    return this.http.get<T>(
      `${this.baseUrl}${endpoint}`,
    );
  }

  post<T>(endpoint: string, body: unknown) {
    return this.http.post<T>(
      `${this.baseUrl}${endpoint}`,
      body,
    );
  }
}