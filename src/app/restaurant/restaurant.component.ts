import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  searchText:any = '';
  public restaurants: any;
  CategoryName:any;
  public tokendisplay = true
  public menudisplay = false
  constructor(private userSer: BackendService,private router: Router) { }

  ngOnInit(): void {

    var token: any = localStorage.getItem('token');
    var refreshToken:any = localStorage.getItem('refreshToken')
    var base64Payload = token.split('.')[1];
    var payload1: any = Buffer.from(base64Payload, 'base64');
    if (JSON.parse(payload1).role === "ADMIN") {
      this.router.navigate(['not-found'])
    }

    const { exp } = JSON.parse(payload1);
    const expired = Date.now() >= exp * 1000

    if(expired == true){
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID,refreshToken).subscribe((res)=>{
        localStorage.setItem('token',res.token)
        window.location.reload()
      })
    }
    
    this.userSer.getRestaurants().subscribe((res) => {
      this.restaurants = res
    })
  }

  
  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
