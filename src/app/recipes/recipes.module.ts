import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RemoveRecipeComponent } from './remove-recipe/remove-recipe.component';
import { RecipesResolverService } from './recipes-resolver.service';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
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

          { path: 'new', component: RecipeEditComponent },/**Toda rota STATICA tem q ser passada ANTES no array das rotas DINAMICAs, caso contrario teremos erros */
          { path: ':id', component: RecipesDetailComponent , resolve: [RecipesResolverService]},
          { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
          { path: ':id/delete', component: RemoveRecipeComponent },
        ]
      },

    ])
  ],
  exports: [RemoveRecipeComponent]


})
export class RecipesModule { }
