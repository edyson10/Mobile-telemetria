import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { IonContent } from '@ionic/angular';

import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';
import { Vehicle, VehicleService } from '../services/vehicle.service';
import { Alert, AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    BottomNavigationComponent,
  ],
})
export class HomePage implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  vehicles: Vehicle[] = [];
  alerts: Alert[] = [];

  loadingVehicles = false;
  loadingAlerts = false;

  vehiclesError = false;
  alertsError = false;

  vehiclePositions = new Map<
    string,
    {
      left: string;
      top: string;
    }
  >();

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly alertService: AlertService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadAlerts();

    interval(5000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.refreshDashboard();
      });
  }

  refreshDashboard(): void {
    this.loadVehicles(false);
    this.loadAlerts(false);
  }

  loadVehicles(showLoading = true): void {
    if (showLoading) {
      this.loadingVehicles = true;
    }

    this.vehiclesError = false;

    this.vehicleService
      .getVehicles()
      .subscribe({
        next: (vehicles) => {
          console.log(
            'Dashboard - vehículos recibidos:',
            vehicles,
          );

          this.vehicles = vehicles;
          this.calculateVehiclePositions(vehicles);
          this.loadingVehicles = false;
          this.changeDetectorRef.detectChanges();
        },

        error: (error) => {
          console.error(
            'Dashboard - error cargando vehículos:',
            error,
          );

          this.loadingVehicles = false;
          this.vehiclesError = true;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  loadAlerts(showLoading = true): void {
    if (showLoading) {
      this.loadingAlerts = true;
    }

    this.alertsError = false;

    this.alertService
      .getRecentAlerts(20)
      .subscribe({
        next: (alerts) => {
          console.log(
            'Dashboard - alertas recibidas:',
            alerts,
          );

          this.alerts = alerts;
          this.loadingAlerts = false;
          this.changeDetectorRef.detectChanges();
        },

        error: (error) => {
          console.error(
            'Dashboard - error cargando alertas:',
            error,
          );

          this.loadingAlerts = false;
          this.alertsError = true;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  get totalVehicles(): number {
    return this.vehicles.length;
  }

  get stoppedVehicles(): number {
    return this.vehicles.filter(
      (vehicle) => vehicle.status === 'STOPPED',
    ).length;
  }

  get movingVehicles(): number {
    return this.vehicles.filter(
      (vehicle) => vehicle.status === 'MOVING',
    ).length;
  }

  get totalAlerts(): number {
    return this.alerts.length;
  }

  calculateVehiclePositions(vehicles: Vehicle[]): void {
    this.vehiclePositions.clear();

    if (vehicles.length === 0) {
      return;
    }

    const latitudes = vehicles.map(
      (vehicle) => vehicle.latitude,
    );

    const longitudes = vehicles.map(
      (vehicle) => vehicle.longitude,
    );

    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);

    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const latitudeRange =
      maxLatitude - minLatitude || 0.001;

    const longitudeRange =
      maxLongitude - minLongitude || 0.001;

    vehicles.forEach((vehicle) => {
      const horizontalPosition =
        10 +
        ((vehicle.longitude - minLongitude) /
          longitudeRange) *
        80;

      const verticalPosition =
        15 +
        ((maxLatitude - vehicle.latitude) /
          latitudeRange) *
        70;

      this.vehiclePositions.set(
        vehicle.id,
        {
          left: `${horizontalPosition}%`,
          top: `${verticalPosition}%`,
        },
      );
    });
  }
}