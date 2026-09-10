import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../core/http/api.service';

export interface Vehicle {
  id: string;
  status: 'MOVING' | 'STOPPED';
  location: string;
  speed: number | null;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface VehicleResponse {
  vehicleId: string;
  lat: number;
  lng: number;
  timestamp: string;
  status: 'MOVING' | 'STOPPED';
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.apiService
      .get<VehicleResponse[]>('/api/v1/vehicles')
      .pipe(
        map((vehicles) =>
          vehicles.map((vehicle) => ({
            id: vehicle.vehicleId,
            status: vehicle.status,
            location: `${vehicle.lat.toFixed(5)}, ${vehicle.lng.toFixed(5)}`,
            speed: null,
            latitude: vehicle.lat,
            longitude: vehicle.lng,
            timestamp: vehicle.timestamp,
          })),
        ),
      );
  }

  getVehicleById(vehicleId: string): Observable<Vehicle> {
    return this.getVehicles().pipe(
      map((vehicles) => {
        const vehicle = vehicles.find(
          (item) => item.id === vehicleId,
        );

        if (!vehicle) {
          throw new Error(
            `Vehículo ${vehicleId} no encontrado`,
          );
        }

        return vehicle;
      }),
    );
  }
}