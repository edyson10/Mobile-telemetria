import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VehicleDetailPage {

  vehicle = {
    id: 'VH-001',
    status: 'MOVING',
    speed: 85,
    battery: 87,
    location: 'Bogotá, Colombia',
    lastUpdate: 'Hace 12 segundos',
  };

}
