import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public menudisplay = false
  constructor(private userSer: BackendService,private router: Router) { }

  ngOnInit(): void {

    var token:any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    console.log(base64Payload)
    var payload1:any = Buffer.from(base64Payload, 'base64');
    console.log(JSON.parse(payload1))
    if(JSON.parse(payload1).role === "ADMIN"){
      this.router.navigate(['not-found'])
    }
    
    if(this.userSer.isLoggedIn()){
      alert("User already logged in");
      this.router.navigate(["userPage"])
    }
  }

  loginForm = new FormGroup({
    'Email_ID': new FormControl('',Validators.required),
    'Password': new FormControl('',Validators.required),
  });

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken")
  }

  setRefreshToken(refreshToken:string) {
    console.log("+++++++++++++++++" + refreshToken)
    localStorage.setItem("refreshToken",refreshToken)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.userSer.login(this.loginForm.value.Email_ID,this.loginForm.value.Password).subscribe((res)=>{
        console.log(res,"res=>");
        // console.log(res.token)
        this.setToken(res.token);
        this.setRefreshToken(res.refreshToken)
        this.router.navigate(['/userPage']);
        alert("User Logged in successfully")
        
        
      },
      (err) => {
        alert("Invalid Username or Password");
        console.log('HTTP Error', err)
      }
      )
    }
    else{
      alert("All fields are required");
    }
  }
  
}
