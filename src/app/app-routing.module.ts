import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'shopping', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
