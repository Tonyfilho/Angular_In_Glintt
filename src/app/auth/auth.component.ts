import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { IAuthResponsePayload } from 'src/assets/models/iAuthResponsePayload';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authenticationForm!: FormGroup;
  displayStyle = "none";
  localError: { status: string, statusText: string, name: string } | any = {}

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authenticationForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
    })
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    // console.log(this.authenticationForm.valid, this.authenticationForm.controls['email'].value);
  }

  onSubmit() {

    if (this.isLoginMode) {

    } else {
      this.authService.signUpNewUser(this.authenticationForm.get('email')?.value, this.authenticationForm.get('password')?.value).subscribe(
        {
          next: (data: IAuthResponsePayload) => { console.log(data) },
          error: (e: any) => {
            console.error(e?.error.error['message']);
            this.localError.name = e?.error.error['message'] ;
            this.localError['status'] = e?.status;
            this.localError['statusText'] = e?.message;
            this.openModal();
          },
          complete: () => console.info("fim do Observable"),
        }
      );
    }
    //console.log(this.authenticationForm.value);
    this.authenticationForm.reset();
  }

  openModal() {
    this.displayStyle = "block";
  }
  closeModal() {
    this.displayStyle = "none";
    this.authenticationForm.reset()
  }

}
