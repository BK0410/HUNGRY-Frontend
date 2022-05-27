import { Router } from '@angular/router';
import { BackendService } from './../backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public menudisplay = false
  constructor(private userSer:BackendService,private router: Router) { }

  ngOnInit(): void {
    if(this.userSer.isLoggedIn()){
      this.router.navigate(["userPage"])
    }
  }

  fn(){
    console.log("BARATH")
    console.log(this.menudisplay)
  }
}
