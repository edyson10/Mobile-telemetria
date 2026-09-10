import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
  imports: [RouterLink,
    RouterLinkActive],
})
export class BottomNavigationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}