import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAuthResponsePayload } from "src/assets/models/iAuthResponsePayload";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * 1º Pegar api do seu projeto https://console.firebase.google.com/u/0/project/ng-course-recipe-book-aa8c0/settings/general
   * 2º Pegar o endpoint da Api rest do Auth https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   * 3º passar os Request Body Payload dentro de um Objeto {email:,  password:, returnSecureToken:}, no metodo Post,
   * 4º Fazer o Cast do dados para interface que criamops no asset IAuthResponsePayload
   */
  API_KEY: string = `AIzaSyC6LRdGCj8YBK3WljfBqffJtzQx07128GI`;
  AUTHSIGN_UP_NEW_USER: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  constructor(private http: HttpClient) {

  }

  signUpNewUser(email: string, password: string) {

  return  this.http.post<IAuthResponsePayload>(this.AUTHSIGN_UP_NEW_USER, {
      email: email,
      password: password,
      returnSecureToken: true //sempre tem q ser envia TRUE
    });
  }

}
