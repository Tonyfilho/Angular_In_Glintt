import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';



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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSubs = this.authService.isUserLogin.subscribe(user => {
      this.isAuthenticated = user ? true : false;   // vendo se estou Autenticado
     // console.log(this.isAuthenticated);


    });
  }

  logOut() {
    this.authService.logOut();
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth');

  }



  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
