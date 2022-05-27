import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public menudisplay = false
  constructor(private userSer: BackendService,private router: Router) { }

  ngOnInit(): void {
  }

  signupForm = new FormGroup({
    'First_Name': new FormControl('', Validators.required),
    'Last_Name': new FormControl('', Validators.required),
    'Email_ID': new FormControl('', Validators.required),
    'Password': new FormControl('', Validators.required),
  });

  signup() {
    if (this.signupForm.valid) {
      this.userSer.signup(this.signupForm.value).subscribe((res) => {
        alert("User registered successfully")
        this.signupForm.reset();
        this.router.navigate(['/login']);
      })
    }
    else {
      alert("All fields are required");
    }
  }

}
