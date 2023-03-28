import { Component } from '@angular/core';
import { llamada } from 'api/firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string ;

  constructor(){
    this.title = "Overlays";
    llamada();
  }
}
