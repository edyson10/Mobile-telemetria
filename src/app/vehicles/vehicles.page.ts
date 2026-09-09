import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterLink } from '@angular/router';

interface Vehicle {
  id: string;
  status: 'MOVING' | 'STOPPED';
  speed: number;
  location: string;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    RouterLink,
  ],
})
export class VehiclesPage {

  vehicles: Vehicle[] = [
    {
      id: 'VH-001',
      status: 'MOVING',
      speed: 85,
      location: 'Bogotá, Colombia',
    },
    {
      id: 'VH-002',
      status: 'MOVING',
      speed: 62,
      location: 'Bogotá, Colombia',
    },
    {
      id: 'VH-003',
      status: 'STOPPED',
      speed: 0,
      location: 'Bogotá, Colombia',
    },
    {
      id: 'VH-004',
      status: 'MOVING',
      speed: 74,
      location: 'Bogotá, Colombia',
    },
    {
      id: 'VH-005',
      status: 'STOPPED',
      speed: 0,
      location: 'Bogotá, Colombia',
    },
  ];

  getStatusLabel(status: Vehicle['status']): string {
    return status === 'MOVING'
      ? 'En movimiento'
      : 'Detenido';
  }
}