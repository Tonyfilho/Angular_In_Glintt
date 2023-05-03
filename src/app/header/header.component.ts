import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../_share/services/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserLoginModel } from '../auth/userLoginModel';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * 1º ver ser o user esta ou não logado
   *
   */
  isAuthenticated: boolean = false;
  private userSubs!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubs = this.authService.localUserLogin.subscribe(user => {
      this.isAuthenticated = user ? true : false;   // vendo se estou Autenticado
     // console.log(this.isAuthenticated);

    });
  }

  logOut() {
    const localUser = new UserLoginModel(' ',' ', ' ', new Date(new Date().getTime()))
    this.isAuthenticated = true;
    this.authService.localUserLogin.next(localUser);

  }



  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
