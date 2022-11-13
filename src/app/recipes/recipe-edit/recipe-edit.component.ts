import { ActivatedRoute, Params } from '@angular/router';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterViewInit {

  nameButton: string= ''
  idRecipe!: number;
  newOrEditRecipesForm: FormGroup;
  newRecipes!:  Partial<RecipesModel>;
  constructor(private fb: FormBuilder, private recipesService: RecipesService, private route: ActivatedRoute) {
   this.newOrEditRecipesForm = fb.group({
     id: [''],
     name: [''],
     description: [''],
     imagePath: [''],
     ingredients:
      fb.group({
        ingredientesName: [''],
        amount: ['']
      })


   });
   }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    // this.route.params.subscribe((data:Params) => { return this.changeButtonName(+ data['id']), console.log('nameButton',this.nameButton, 'Id',data['id'])});
    this.idRecipe = +this.route.snapshot.params['id'];
    console.log('nameButton',this.idRecipe)
    this.changeButtonName(this.idRecipe);

  }

  changeButtonName(id: number): string {
    if(id) {
      return   this.nameButton = 'Update Recipes' ;
    }
    return  this.nameButton = 'Save a New Recipes';
  }

}
