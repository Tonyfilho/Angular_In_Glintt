import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RemoveRecipeComponent } from './remove-recipe/remove-recipe.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipesStartComponent,
    RecipeEditComponent,
    RemoveRecipeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([

      {
        path: '', component: RecipesComponent, children: [
          { path: '', component: RecipesStartComponent },
          { path: 'new', component: RecipeEditComponent },/**Toda rota STATICA tem q ser passada ANTES no array das rotas DINAMICAs, caso contrario teremos erros */
          { path: ':id/detail', component: RecipesDetailComponent },
          { path: ':id/edit', component: RecipeEditComponent },
          { path: ':id/delete', component: RemoveRecipeComponent },
        ]
      },

    ])
  ]


})
export class RecipesModule { }
