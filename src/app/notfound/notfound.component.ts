import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  public menudisplay = false
  constructor(private router:Router) { }

  ngOnInit(): void {
    var token:any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    console.log(base64Payload)
    var payload1:any = Buffer.from(base64Payload, 'base64');
    console.log(JSON.parse(payload1))
    if(JSON.parse(payload1).role === "ADMIN"){
      this.router.navigate(['admin'])
    }
  }

}
