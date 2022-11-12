import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipesStartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([

      {path: '', component: RecipesComponent , children: [
         {path: '', component: RecipesStartComponent},
        {path: ':id', component: RecipesDetailComponent},
      ]},

    ])
  ]
  ,
  exports: [
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
  ]
})
export class RecipesModule { }
