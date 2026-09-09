import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, RouterLink],
})
export class HomePage {}