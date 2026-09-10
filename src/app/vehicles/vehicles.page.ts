import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';
import {
  Vehicle,
  VehicleService,
} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    RouterLink,
    BottomNavigationComponent,
  ],
})
export class VehiclesPage implements OnInit {

  vehicles = signal<Vehicle[]>([]);

  loading = signal(false);
  error = signal(false);

  constructor(
    private readonly vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading.set(true);
    this.error.set(false);

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {

        console.log(
          'Vehículos recibidos del backend:',
          vehicles,
        );

        this.vehicles.set(vehicles);
        this.loading.set(false);
      },

      error: (error) => {

        console.error(
          'Error cargando vehículos:',
          error,
        );

        this.loading.set(false);
        this.error.set(true);
      },
    });
  }

  getStatusLabel(status: Vehicle['status']): string {
    return status === 'MOVING'
      ? 'En movimiento'
      : 'Detenido';
  }

  getMovingVehicles(): number {
    return this.vehicles().filter(
      (vehicle) => vehicle.status === 'MOVING',
    ).length;
  }

  getStoppedVehicles(): number {
    return this.vehicles().filter(
      (vehicle) => vehicle.status === 'STOPPED',
    ).length;
  }
}