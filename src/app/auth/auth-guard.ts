import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  /**
   *1º Injetaremos o serviço, mas ele retorna um BehaSubject e não 1 Observable, com isto daremos um MAP do RXJS q retorna um Observable;
   *2º Take(1) para termos certeza que iremos fazer 1 só subscrição no observable, visto que estamos usando um BehaviorSubject
   *3º return !!user Quando retornamos !!User queremos dizer Q: Se houver valor será transformado em Boolean TRUE,
   e se for Undefined ou Null, será transformado em Boolean FALSE;
   *4º Podemos usar uma Nova Abordagem q é Alem de retornar O Boolean, podemos retornar uma URL de redirecionamento em caso de FALSE;
   */


  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error("Method not implemented.");
    return this.authService.isUserLogin.pipe(take(1),map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return isAuth
      }
      return this.router.createUrlTree(['/auth']);
    }))
  }

}
