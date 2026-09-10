import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { finalize } from 'rxjs';

import {
  Vehicle,
  VehicleService,
} from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    RouterLink,
  ],
})
export class VehicleDetailPage implements OnInit {

  vehicle: Vehicle | null = null;

  loading = false;
  error = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly vehicleService: VehicleService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const vehicleId =
      this.route.snapshot.paramMap.get('id');

    console.log(
      'ID del vehículo:',
      vehicleId,
    );

    if (!vehicleId) {
      this.error = true;
      return;
    }

    this.loadVehicle(vehicleId);
  }

  loadVehicle(vehicleId: string): void {

    this.loading = true;
    this.error = false;

    console.log(
      'Cargando vehículo:',
      vehicleId,
    );

    this.vehicleService
      .getVehicleById(vehicleId)
      .subscribe({

        next: (vehicle) => {

          console.log(
            'Vehículo recibido del backend:',
            vehicle,
          );

          this.vehicle = vehicle;
          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando vehículo:',
            error,
          );

          this.loading = false;
          this.error = true;

          this.cdr.detectChanges();
        },

      });
  }

  getStatusLabel(
    status: Vehicle['status'],
  ): string {

    return status === 'MOVING'
      ? 'En movimiento'
      : 'Detenido';
  }
}