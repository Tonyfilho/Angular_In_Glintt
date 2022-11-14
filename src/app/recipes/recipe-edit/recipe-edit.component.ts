import { IngredientsModel } from './../../../assets/models/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

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
     id: [{value: '' ,disabled: true}],
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

   // this.route.params.subscribe((data:Params) => { return this.changeButtonName(+ data['id'])});
    this.idRecipe = +this.route.snapshot.params['id'];
    this.newOrEditRecipesForm.get("id")?.setValue(this.idRecipe);
    console.log('nameButton',this.idRecipe)
    this.changeButtonName(this.idRecipe);

  }

  changeButtonName(id: number): string {
    if(id) {
      this.updateForm();
      return   this.nameButton = 'Update Recipes' ;
    }
    return  this.nameButton = 'Save a New Recipes';
  }

  updateForm(){
    this.recipesService.getReceipesById(this.idRecipe).subscribe((recipe: RecipesModel) => {
      this.newOrEditRecipesForm.get("name")?.patchValue(recipe.name);
      this.newOrEditRecipesForm.get("description")?.patchValue(recipe.description);
      this.newOrEditRecipesForm.get("imagePath")?.patchValue(recipe.imagePath);
      recipe.ingredients.map((incredient: IngredientsModel) => {
        this.newOrEditRecipesForm.get("ingredients:ingredientesName")?.patchValue(incredient.name);
        this.newOrEditRecipesForm.get("ingredients:amount")?.patchValue(incredient.amount);
      });

    });
  }

}
