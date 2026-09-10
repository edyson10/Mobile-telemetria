import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';

interface MenuOption {
  icon: string;
  title: string;
  description: string;
  route?: string;
}

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
  imports: [IonContent, CommonModule, FormsModule, BottomNavigationComponent]
})
export class MorePage implements OnInit {

  menuOptions: MenuOption[] = [
    {
      icon: '👤',
      title: 'Perfil',
      description: 'Administra tu información personal',
    },
    {
      icon: '🔔',
      title: 'Notificaciones',
      description: 'Configura tus notificaciones',
    },
    {
      icon: '⚙',
      title: 'Configuración',
      description: 'Preferencias de la aplicación',
    },
    {
      icon: 'ⓘ',
      title: 'Acerca de',
      description: 'Información de Fleet Telemetry',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
