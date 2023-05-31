import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { IAuthResponsePayloadSign } from 'src/app/_share/models/iAuthResponsePayload';
import { Router, Routes } from '@angular/router';
import { DataStorageService } from '../_share/services/data-storage.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLodingSpinner = false;
  authenticationForm!: UntypedFormGroup;
  displayStyle = { displayBlock: "none", displayStyle: '' };
  localModal: { status: string, statusText: string, name: string } | any = {};


  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router, private dataStorage : DataStorageService) {
    this.authenticationForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
    })
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {

    if (this.isLoginMode) {
      this.isLodingSpinner = true;
      this.authService.signInUser(this.authenticationForm.get('email')?.value, this.authenticationForm.get('password')?.value).subscribe(
        {
          next: (data: IAuthResponsePayloadSign) => {
            this.isLodingSpinner = false;
            console.log('Response Data: ',data)
            this.localModal.name = 'All Right!!! ';
            this.localModal['status'] = 'Welcome';
            this.localModal['statusText'] = 'You are Login';
            this.displayStyle.displayStyle = 'alert-success';
            this.openModal();
            this.router.navigateByUrl('/recipes');
            this.dataStorage.fetchRecipesWithAuthAndInterceptor().subscribe(); // carregando o Fetch,

          },
          error: (e: any) => {
            this.isLodingSpinner = false;
           //o erro vem pelo Subscribe
           // console.log('error do e: ', e);
            this.localModal.name = 'Ops... Some thing Wrong :';
            this.localModal['status'] = e + '401'
            this.displayStyle.displayStyle = 'alert-danger';
            this.openModal();

          },
          complete: () => { console.info("fim do Observable") },
        }
      );

    } else {
      this.isLodingSpinner = true;
      this.authService.signUpNewUser(this.authenticationForm.get('email')?.value, this.authenticationForm.get('password')?.value).subscribe(
        {
          next: (data: IAuthResponsePayloadSign) => {
            this.isLodingSpinner = false;
            console.log(data)
            this.localModal.name = 'All Right!!! ';
            this.localModal['status'] = '201';
            this.localModal['statusText'] = 'You create a new user, congratulation';
            this.displayStyle.displayStyle = 'alert-success';
            this.openModal();
            this.router.navigateByUrl('/recipes');


          },
          error: (e: any) => {
            this.isLodingSpinner = false;
            // console.error(e?.error.error['message']);
            this.errorFireBaseSignUp(e?.error.error['message']);
            console.log('error do e: ', e);
            this.localModal.statusText = e;
            this.localModal.name = 'Ops... Some thing Wrong :';
            this.localModal['status'] = e?.name + ' ' + e?.status;
            this.displayStyle.displayStyle = 'alert-danger';
            this.openModal();
          },
          complete: () => { console.info("fim do Observable") },
        }
      );
    }

  }

  openModal() {
    this.displayStyle.displayBlock = "block";
    this.authenticationForm.reset();

  }
  closeModal() {
    this.displayStyle.displayBlock = "none";
    this.displayStyle.displayStyle = "";
    this.authenticationForm.reset()
  }

  errorFireBaseSignUp(error: string) {
    switch (error) {
      case 'EMAIL_EXISTS':
       this.localModal.statusText = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
       this.localModal.statusText = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
       this.localModal.statusText = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      default:
        this.localModal.statusText = 'An unkown error occurred!. ';
        break;
    }

   }





}
