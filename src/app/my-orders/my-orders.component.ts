import { Router } from '@angular/router';
import { BackendService } from './../backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  public categories: any
  public display = true;
  public tokendisplay = true;
  public count = 0;
  public menudisplay = false
  constructor(private userSer: BackendService, private router: Router) { }

  ngOnInit(): void {

    var token: any = localStorage.getItem('token');
    var refreshToken:any = localStorage.getItem('refreshToken')
    var base64Payload = token.split('.')[1];
    console.log(base64Payload)
    var payload1: any = Buffer.from(base64Payload, 'base64');
    console.log(JSON.parse(payload1))
    if (JSON.parse(payload1).role === "ADMIN") {
      this.router.navigate(['not-found'])
    }

    const { exp } = JSON.parse(payload1);
    const expired = Date.now() >= exp * 1000
    console.log("________" + expired)

    if(expired == true){
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID,refreshToken).subscribe((res)=>{
        console.log("+++++++++++++" + res.token)
        localStorage.setItem('token',res.token)
        window.location.reload()
      })
    }
    this.userSer.getUserOrderDetails().subscribe((res) => {
      console.log(res, "res==>");
      if (res.length > 0) {
        this.display = false
      }
      this.categories = res

      for (let i = 0; i < this.categories.length; i++) {
        let sum = 0;
        for (let j = 0; j < this.categories[i][4].length; j++) {
          sum = sum + this.categories[i][4][j]
        }
        this.categories[i].push(sum)
      }
    })

    this.userSer.getSingleUser().subscribe((res) => {
      this.count = Object.keys(res.cart).length
    })

  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getToken(): void {
    var token: any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    var payload1: any = Buffer.from(base64Payload, 'base64');
    if (JSON.parse(payload1).role === "ADMIN") {
      this.router.navigate(['not-found'])
    }
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

}
function isTokenExpired(token: any, arg1: string | null) {
  throw new Error('Function not implemented.');
}

