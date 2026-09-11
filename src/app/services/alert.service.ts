import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Alert {
  message: string;
  timestamp: string;
  type: string;
  vehicleId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private readonly apiUrl =
    `${environment.apiBaseUrl}/api/v1/alerts`;

  constructor(
    private readonly http: HttpClient,
  ) {}

  getRecentAlerts(limit = 20): Observable<Alert[]> {
    return this.http
      .get<Alert[]>(
        `${this.apiUrl}?limit=${limit}`,
      )
      .pipe(
        map((alerts) => alerts ?? []),
      );
  }
}