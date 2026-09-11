import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IonContent } from '@ionic/angular';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';
import { Alert, AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    BottomNavigationComponent,
  ],
})
export class AlertsPage implements OnInit {

  alerts: Alert[] = [];

  loading = false;
  error = false;

  selectedFilter: 'ALL' | 'ACTIVE' | 'HISTORY' = 'ALL';

  constructor(
    private readonly alertService: AlertService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.loading = true;
    this.error = false;

    this.alertService
      .getRecentAlerts(20)
      .subscribe({
        next: (alerts) => {
          console.log(
            'Alertas recibidas del backend:',
            alerts,
          );

          this.alerts = alerts;
          this.loading = false;
          this.error = false;

          this.changeDetectorRef.detectChanges();
        },

        error: (error) => {
          console.error(
            'Error cargando alertas:',
            error,
          );

          this.loading = false;
          this.error = true;

          this.changeDetectorRef.detectChanges();
        },
      });
  }

  selectFilter(
    filter: 'ALL' | 'ACTIVE' | 'HISTORY',
  ): void {
    this.selectedFilter = filter;
  }

  get filteredAlerts(): Alert[] {

    switch (this.selectedFilter) {

      case 'ACTIVE':
        return this.alerts.filter(
          (alert) => this.isAlertActive(alert),
        );

      case 'HISTORY':
        return this.alerts.filter(
          (alert) => !this.isAlertActive(alert),
        );

      case 'ALL':
      default:
        return this.alerts;
    }
  }

  get activeAlertsCount(): number {
    return this.alerts.filter(
      (alert) => this.isAlertActive(alert),
    ).length;
  }

  /**
   * El backend actualmente no envía un campo "active".
   *
   * Para mantener el comportamiento visual de la aplicación,
   * consideramos las alertas de vehículo detenido como activas.
   */
  isAlertActive(alert: Alert): boolean {
    return alert.type === 'VEHICLE_STOPPED';
  }

  getAlertTitle(alert: Alert): string {

    switch (alert.type) {

      case 'VEHICLE_STOPPED':
        return 'Vehículo detenido';

      case 'SPEED':
      case 'SPEED_EXCEEDED':
      case 'EXCESSIVE_SPEED':
        return 'Exceso de velocidad';

      case 'ROUTE':
      case 'OUT_OF_ROUTE':
        return 'Fuera de ruta';

      default:
        return alert.message;
    }
  }

  getAlertIcon(alert: Alert): string {

    switch (alert.type) {

      case 'VEHICLE_STOPPED':
        return '⏸';

      case 'SPEED':
      case 'SPEED_EXCEEDED':
      case 'EXCESSIVE_SPEED':
        return '⚠';

      case 'ROUTE':
      case 'OUT_OF_ROUTE':
        return '⌁';

      default:
        return '⚠';
    }
  }

  getAlertClass(alert: Alert): string {

    switch (alert.type) {

      case 'VEHICLE_STOPPED':
        return 'stopped';

      case 'SPEED':
      case 'SPEED_EXCEEDED':
      case 'EXCESSIVE_SPEED':
        return 'speed';

      case 'ROUTE':
      case 'OUT_OF_ROUTE':
        return 'route';

      default:
        return 'default';
    }
  }

  formatAlertTime(timestamp: string): string {

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    return new Intl.DateTimeFormat(
      'es-CO',
      {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date);
  }
}