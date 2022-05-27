import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private titleService:Title) {
    this.titleService.setTitle("H U N G R Y");
  }

  title = 'HUNGRY';
  onActivate() {
    window.scroll(0,0);}
    
}
