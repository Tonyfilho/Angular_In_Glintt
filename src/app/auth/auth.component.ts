import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authenticationForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.authenticationForm = fb.group({
      email: [ Validators.required, Validators.email],
      password: [ Validators.required, Validators.min(8)],
    })
  }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

}
