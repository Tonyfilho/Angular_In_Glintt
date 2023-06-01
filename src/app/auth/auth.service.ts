import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { IAuthResponsePayloadSign } from "src/app/_share/models/iAuthResponsePayload";
import { UserTokenModel } from "./userLoginModel";

/**
 * 1º Pegar api do seu projeto https://console.firebase.google.com/u/0/project/ng-course-recipe-book-aa8c0/settings/general;
 * 2º Fazer o Sign_Up pegar o endpoint da Api rest do Auth https://firebase.google.com/docs/reference/rest/auth#section-create-email-password;
 * 3º passar os Request Body Payload dentro de um Objeto {email:,  password:, returnSecureToken:}, no metodo Post;
 * 4º Fazer o Cast do dados para interface que criamops no asset IAuthResponsePayload;
 * 5ª Fazer o SIGN_IN, pegar o end point https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password;
 * 6º Salvar os dados de SIGNUP e SIGIN, usando TAP depois do CatchError, o TAP é um operador que PEMITE EXECULTAR ou Realizar outra ação sem mudar um RESPONSE
 * e dentro do bloco do TAP será onde criaremos a Instancia do USER que foi logado, ou criado;
 * 7º Gerar o token de expiração ,s erá criado por nos, dentro do bloco do TAP;
 * 8º Pegar o Token que vem do AuthService para ter acesso aos dados que temos na no realtime database,mas lá mp DATA-STORAGE-SERVICE;
 * 9º No handleAuthentication Guardando autenticação no LOCALSTORAGE do browser, Lembrando q não será um Objeto JS, mas um string que precisa ser convertida
 * usando JSON.stringify;
 * 10º  Cria um Metodo que conte o tempo do Token para o invalidar o time do localStorage chama-lo no logout;
 */
const  API_KEY: string = `AIzaSyC6LRdGCj8YBK3WljfBqffJtzQx07128GI`;
const  AUTHSIGN_UP_NEW_USER: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const  AUTHSIGN_IN_USERS: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // localUserLogin: Subject<UserLoginModel> = new Subject<UserLoginModel>(); /**Salvando o Token no model */
  isUserLogin: BehaviorSubject<UserTokenModel | any> = new BehaviorSubject<UserTokenModel | any>(null); /**Salvando o Token no model */
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {

  }

  signUpNewUser(email: string, password: string) {
    return this.http.post<IAuthResponsePayloadSign>(AUTHSIGN_UP_NEW_USER, {
      email: email,
      password: password,
      returnSecureToken: true //sempre tem q ser envia TRUE
    }).pipe(tap(
      userByTap => {
        this.handleAuthentication(userByTap.email, userByTap.localId, userByTap.idToken, +userByTap.expiresIn) // e temos que converte-lo em NUMBER usando um +
      }));
  }

  signInUser(email: string, password: string) {
    return this.http.post<IAuthResponsePayloadSign>(AUTHSIGN_IN_USERS, {
      email: email,
      password: password,
      returnSecureToken: true //sempre tem q ser envia TRUE
    }).pipe(catchError(this.handleError), tap(
      userByTap => {
        this.handleAuthentication(userByTap.email, userByTap.localId, userByTap.idToken, +userByTap.expiresIn) // e temos que converte-lo em NUMBER usando um +
      })); // foi criado observable de erro, para fins laborais
  }

  /**
   * 1º fazer um destruction hja tipando os dados;
   * 2º ver se existem dados na Var localUserStorage;
   * 3º cria o novo Objeto do modelo USERLOGINMODEL;
   * 4º verificar se exitem 1 token lá no Objeto;
   * 5º Emitir o USER caso ja exista o Token;
   * 6º Injetar este metodo no compomente PAI o APP.Compoment;
   *
   */
  autoLoginWithLocalStorage() {
    const localUserStorage: { email: string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('userData') as string);
    //console.log('no autologin: ', JSON.parse(localStorage.getItem('userData') as string))
    if (!localUserStorage) {
      return;
    }
    const localUserLogin = new UserTokenModel(localUserStorage.email, localUserStorage.id, localUserStorage._token, new Date(localUserStorage._tokenExpirationDate));
    if (localUserLogin.token) {
      this.isUserLogin.next(localUserLogin);
      /**
       * aqui precisamos calcular o tempo restante do TOKEN
       */
      const expirationDuration = new Date(localUserStorage._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogoutWithLocalStorage(expirationDuration);
    }

  }
  autoLogoutWithLocalStorage(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDate);
  }

  logOut() {
    this.isUserLogin.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }



  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    /**Criando o token de expiração  ,e mutiplicar por 1000, pois getTime é Segundos e ExpereIN é em milisegundo*/
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const localUserToken = new UserTokenModel(email, userId, token, expirationDate);
    this.isUserLogin.next(localUserToken);
    this.autoLogoutWithLocalStorage(expiresIn * 1000); //tranformando em Milisegundo
    localStorage.setItem('userData', JSON.stringify(localUserToken)); //Quardaremos em LocalStorage um String com todos os Dados.
  }


  private handleError(errorRes: HttpErrorResponse) {
    let localErrorResponse = { statusText: '' };
    switch (errorRes?.error.error['message']) {
      case 'EMAIL_NOT_FOUND':
        localErrorResponse.statusText = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'INVALID_PASSWORD':
        localErrorResponse.statusText = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        localErrorResponse.statusText = 'The user account has been disabled by an administrator.';
        break;

      default:
        localErrorResponse.statusText = 'An unkown error occurred!. ';
        break;

    }
    let error = new Error(localErrorResponse.statusText);
    return throwError(() => error);
  }
}
