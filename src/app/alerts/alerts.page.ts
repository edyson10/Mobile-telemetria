import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';

import { RouterLink } from '@angular/router';

interface Alert {
  vehicleId: string;
  type: 'STOPPED' | 'SPEED' | 'ROUTE';
  title: string;
  description: string;
  time: string;
  active: boolean;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
  imports: [IonContent, CommonModule, FormsModule, BottomNavigationComponent]
})
export class AlertsPage implements OnInit {

  ngOnInit(): void {
  }

  selectedFilter: 'ALL' | 'ACTIVE' | 'HISTORY' = 'ALL';

  alerts: Alert[] = [
    {
      vehicleId: 'VH-003',
      type: 'STOPPED',
      title: 'Vehículo detenido',
      description: 'El vehículo lleva más de 1 minuto detenido.',
      time: 'Hace 5 min',
      active: true,
    },
    {
      vehicleId: 'VH-001',
      type: 'SPEED',
      title: 'Exceso de velocidad',
      description: 'Velocidad registrada: 105 km/h.',
      time: 'Hace 18 min',
      active: true,
    },
    {
      vehicleId: 'VH-005',
      type: 'ROUTE',
      title: 'Fuera de ruta',
      description: 'El vehículo se encuentra fuera de la ruta asignada.',
      time: 'Hace 32 min',
      active: true,
    },
    {
      vehicleId: 'VH-002',
      type: 'STOPPED',
      title: 'Vehículo detenido',
      description: 'El vehículo estuvo detenido durante 2 minutos.',
      time: 'Hace 1 h',
      active: false,
    },
    {
      vehicleId: 'VH-004',
      type: 'SPEED',
      title: 'Exceso de velocidad',
      description: 'Velocidad registrada: 98 km/h.',
      time: 'Hace 2 h',
      active: false,
    },
  ];

  get filteredAlerts(): Alert[] {
    if (this.selectedFilter === 'ACTIVE') {
      return this.alerts.filter((alert) => alert.active);
    }

    if (this.selectedFilter === 'HISTORY') {
      return this.alerts.filter((alert) => !alert.active);
    }

    return this.alerts;
  }

  selectFilter(
    filter: 'ALL' | 'ACTIVE' | 'HISTORY',
  ): void {
    this.selectedFilter = filter;
  }

  getAlertIcon(type: Alert['type']): string {
    if (type === 'STOPPED') {
      return '⏸';
    }

    if (type === 'SPEED') {
      return '⚠';
    }

    return '⌁';
  }

}
