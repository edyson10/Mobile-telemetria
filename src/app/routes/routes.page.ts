import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';

interface RouteInfo {
  name: string;
  vehicleId: string;
  origin: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  status: string;
}

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
  imports: [IonContent, CommonModule, FormsModule, BottomNavigationComponent]
})
export class RoutesPage implements OnInit {

  route: RouteInfo = {
    name: 'Ruta Bogotá - Chía',
    vehicleId: 'VH-001',
    origin: 'Bogotá',
    destination: 'Chía',
    distance: '32.5 km',
    estimatedTime: '45 min',
    status: 'En ejecución',
  };

  constructor(
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
