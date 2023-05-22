export class UserLoginModel {
  /**1º O acesso dos Atributos privados serão feitas usando o GET
   * 2º fazer a checagem se existe um tokenDate e se a data Atual é maior que a data do token, caso seja a cessão ja expirou.
   * 3º As instancias deste UserLoginModel tem q ser do tipo SUBJECT 
   */
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }


  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
         return null;
    }

    return this._token;
  }

}
