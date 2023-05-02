import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesModule } from './recipes/recipes.module';
import { HeaderButtonsComponent } from './header/header-buttons/header-buttons.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnersComponent } from './_share/spinners/spinners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderButtonsComponent,
    AuthComponent,
    SpinnersComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
