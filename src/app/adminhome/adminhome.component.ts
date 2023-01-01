import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private userSer: BackendService,private router: Router) { }

  ngOnInit(): void {
    if(this.userSer.isLoggedIn()){
      alert("Admin already logged in");
      this.router.navigate(["admin"])
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  adminlogin(){
    if(this.loginForm.valid){
      //(this.loginForm.value);
      this.userSer.adminlogin(this.loginForm.value.Email_ID,this.loginForm.value.Password).subscribe((res)=>{
        //(res,"res=>");
        // //(res.token)
        this.setToken(res.token);
        this.router.navigate(['/admin']);
        alert("Admin Logged in successfully")
        
        
      },
      (err) => {
        alert("Invalid Username or Password");
        //('HTTP Error', err)
      }
      )
    }
    else{
      alert("All fields are required");
    }
  }
  
}
