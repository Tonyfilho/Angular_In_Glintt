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
  isLodingSpinner = false;
  authenticationForm!: FormGroup;
  displayStyle = {displayBlock:  "none", displayStyle: ''};
  localModal: { status: string, statusText: string, name: string } | any = {}

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
      this.isLodingSpinner = true;
      this.authService.signUpNewUser(this.authenticationForm.get('email')?.value, this.authenticationForm.get('password')?.value).subscribe(
        {
          next: (data: IAuthResponsePayload) => {
            this.isLodingSpinner = false;
            console.log(data)
            this.localModal.name = 'All Right!!! ';
            this.localModal['status'] = '201';
            this.localModal['statusText'] = 'You create a new user, congratulation';
            this.displayStyle.displayStyle = 'alert-success';
            this.openModal();

          },
          error: (e: any) => {
            this.isLodingSpinner = false;
           // console.error(e?.error.error['message']);
            this.localModal.name = 'Ops... Some thing Wrong :'+ e?.error.error['message'];
            this.localModal['status'] = e?.name + ' ' +e?.status;
            this.localModal['statusText'] = 'Looks like the email already been in using';
            this.displayStyle.displayStyle = 'alert-danger';
            this.openModal();
          },
          complete: () => {console.info("fim do Observable")},
        }
      );
    }
    //console.log(this.authenticationForm.value);
  }

  openModal() {
    this.displayStyle.displayBlock = "block";
    this.authenticationForm.reset();

  }
  closeModal() {
    this.displayStyle.displayBlock = "none";
    this.displayStyle.displayStyle= "";

    this.authenticationForm.reset()
  }

}
