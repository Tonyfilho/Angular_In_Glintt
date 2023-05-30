
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [

  {path: 'auth', component: AuthComponent},
  {path: 'shopping', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule), canActivate:[AuthGuard]},
  // {path: 'recipes', component:RecipesComponent},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule), canActivate:[AuthGuard]},
  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
