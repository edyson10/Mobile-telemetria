import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { BottomNavigationComponent } from '../components/bottom-navigation/bottom-navigation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, BottomNavigationComponent],
})
export class HomePage {}