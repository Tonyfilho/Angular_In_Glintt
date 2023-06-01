import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { IAuthResponsePayloadSign } from 'src/app/_share/models/iAuthResponsePayload';
import { Router, Routes } from '@angular/router';
import { DataStorageService } from '../_share/services/data-storage.service';
import { IModal } from '../_share/models/IModal';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoadModal : boolean | any = false;
  isLodingSpinner: boolean   = false;
  authenticationForm!: FormGroup<{email:FormControl, password: FormControl}>;
  // displayStyle = { displayBlock: "none", displayStyle: '' };
  localModal: { status: string, statusText: string, name: string } | any = {};
  modalService: IModal = {message:'', kind:'',statusText:''}


  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router, private dataStorage: DataStorageService) {
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
            console.log('Response Data sucess: ', data);
            this.modalService['kind'] = 'sucess';
            this.modalService['message'] = 'You are Login';
            this.modalService['statusText'] = 'Welcome: ' + data.email;
            this.isLodingSpinner = false;
            this.isLoadModal = true;
          },
          error: (e: any) => {
            this.modalService['message'] = 'Some thing Wrong';
            this.modalService['kind'] = 'error';
            this.modalService['statusText'] = e;
            console.log('error do e: ', e);
            this.isLodingSpinner = false;
            this.isLoadModal = true;

          },
          complete: () => { console.info("fim do Observable");
          this.dataStorage.fetchRecipesWithAuthAndInterceptor().subscribe(); // carregando o Fetch,

        },
        }
      );

    } else {
      this.isLodingSpinner = true;
      this.authService.signUpNewUser(this.authenticationForm.get('email')?.value, this.authenticationForm.get('password')?.value).subscribe(
        {
          next: (data: IAuthResponsePayloadSign) => {
            this.isLodingSpinner = false;
            this.modalService['message'] = 'All Right';
            this.modalService['kind'] = 'sucess';
            this.modalService['statusText'] = 'You create a new user, congratulation: ' + data.email;
            this.isLoadModal = true;
            // console.log(data)
            // this.localModal.name = 'All Right!!! ';
            // this.localModal['status'] = '201';
            // this.localModal['statusText'] = 'You create a new user, congratulation';
            // this.displayStyle.displayStyle = 'alert-success';
            // this.openModal();
           // this.router.navigateByUrl('/recipes'); O redirecinamento será feito junto com AuthService


          },
          error: (e: any) => {
            this.errorFireBaseSignUp(e?.error.error['message']);
            this.modalService['message'] = 'Some thing Wrong';
            this.modalService['kind'] = 'error';
            this.modalService['statusText'] = e;
            this.isLodingSpinner = false;
            this.isLoadModal = true;

            //console.log('error do e: ', e);
            // this.localModal.statusText = e;
            // this.localModal.name = 'Ops... Some thing Wrong :';
            // this.localModal['status'] = e?.name + ' ' + e?.status;
            // this.displayStyle.displayStyle = 'alert-danger';
            // this.openModal();
            // console.error(e?.error.error['message']);
          },
          complete: () => { console.info("fim do Observable") },
        }
      );
    }

  }

  // openModal() {
  //   this.displayStyle.displayBlock = "block";
  //   this.authenticationForm.reset();

  // }
  closeModal() {
    // this.displayStyle.displayBlock = "none"; // padrão de modal basico
    // this.displayStyle.displayStyle = ""; // padrão de modal basico
    this.isLoadModal  = null; // a var tem q resetada para null, para termos o efeito esperado.
    this.authenticationForm.reset()
    this.router.navigateByUrl('/recipes'); // tive q passar para  aqui, porque não carregava o Modal
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
