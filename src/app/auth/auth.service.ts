import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { IAuthResponsePayloadSign } from "src/assets/models/iAuthResponsePayload";
import { UserLoginModel } from "./userLoginModel";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * 1º Pegar api do seu projeto https://console.firebase.google.com/u/0/project/ng-course-recipe-book-aa8c0/settings/general
   * 2º Fazer o Sign_Up pegar o endpoint da Api rest do Auth https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   * 3º passar os Request Body Payload dentro de um Objeto {email:,  password:, returnSecureToken:}, no metodo Post,
   * 4º Fazer o Cast do dados para interface que criamops no asset IAuthResponsePayload
   * 5ª Fazer o SIGN_IN, pegar o end point https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
   * 6º Salvar os dados de SIGNUP e SIGIN, usando TAP depois do CatchError, o TAP é um operador que PEMITE EXECULTAR ou Realizar outra ação sem mudar um RESPONSE
   * e dentro do bloco do TAP será onde criaremos a Instancia do USER que foi logado, ou criado.
   * 7º Gerar o token de expiração ,s erá criado por nos, dentro do bloco do TAP
   * 8º Pegar o Token que vem do AuthService para ter acesso aos dados que temos na no realtime database,mas lá mp DATA-STORAGE-SERVICE
   */
  private API_KEY: string = `AIzaSyC6LRdGCj8YBK3WljfBqffJtzQx07128GI`;
  private AUTHSIGN_UP_NEW_USER: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  private AUTHSIGN_IN_USERS: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
 // localUserLogin: Subject<UserLoginModel> = new Subject<UserLoginModel>(); /**Salvando o Token no model */
  isUserLogin: BehaviorSubject<UserLoginModel | any > = new BehaviorSubject<UserLoginModel| any >(''); /**Salvando o Token no model */
  constructor(private http: HttpClient) {

  }

  signUpNewUser(email: string, password: string) {
    return this.http.post<IAuthResponsePayloadSign>(this.AUTHSIGN_UP_NEW_USER, {
      email: email,
      password: password,
      returnSecureToken: true //sempre tem q ser envia TRUE
    }).pipe(tap(
      userByTap => {
        this.handleAuthentication(userByTap.email, userByTap.localId, userByTap.idToken, +userByTap.expiresIn) // e temos que converte-lo em NUMBER usando um +
      }));
  }

  signInUser(email: string, password: string) {
    return this.http.post<IAuthResponsePayloadSign>(this.AUTHSIGN_IN_USERS, {
      email: email,
      password: password,
      returnSecureToken: true //sempre tem q ser envia TRUE
    }).pipe(catchError(this.handleError), tap(
      userByTap => {
        this.handleAuthentication(userByTap.email, userByTap.localId, userByTap.idToken, +userByTap.expiresIn) // e temos que converte-lo em NUMBER usando um +
      })); // foi criado observable de erro, para fins laborais
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    /**Criando o token de expiração  ,e mutiplicar por 1000, pois getTime é Segundos e ExpereIN é em milisegundo*/
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const localUser = new UserLoginModel(email, userId, token, expirationDate);
    this.isUserLogin.next(localUser);
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
