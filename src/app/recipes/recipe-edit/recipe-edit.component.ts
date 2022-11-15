import { Observable, of } from 'rxjs';
import { IngredientsModel } from './../../../assets/models/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {


  nameButton: string = ''
  idRecipe!: number;
  newOrEditRecipesForm: FormGroup;
  newRecipes!: Partial<RecipesModel>;
  constructor(private fb: FormBuilder, private recipesService: RecipesService, private route: ActivatedRoute) {

    this.route.params.subscribe((data: Params) => { this.idRecipe = +data['id'] }); /**Rotas Asyncronas tem que ser carregadas no CONSTRUTOR */
    this.newOrEditRecipesForm = fb.group({
      id: [{ value: '', disabled: true }],
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


  ngOnInit(): void {
    //  this.idRecipe = +this.route.snapshot.params['id'];

    console.log('nameButton', this.idRecipe)
    this.changeButtonName(this.idRecipe);

  }

  changeButtonName(id: number): string {
    if (id) {
      this.updateForm();
      return this.nameButton = 'Update Recipes';
    }
    return this.nameButton = 'Save a New Recipes';
  }

  updateForm() {
    this.newOrEditRecipesForm.get("id")?.setValue(this.idRecipe);
    this.recipesService.getReceipesById(this.idRecipe).subscribe((recipe: RecipesModel) => {
      this.newOrEditRecipesForm.get("name")?.patchValue(recipe?.name);
      this.newOrEditRecipesForm.get("description")?.patchValue(recipe?.description);
      this.newOrEditRecipesForm.get("imagePath")?.patchValue(recipe?.imagePath);

      /**MAPEADO e Pegando dados para o  ARRAY  de Form ou por direto  */
      recipe?.ingredients.map((incredient: IngredientsModel) => {
        this.newOrEditRecipesForm.get(['ingredients', 'ingredientesName'])?.patchValue(incredient?.name);
        this.newOrEditRecipesForm.get(["ingredients", 'amount'])?.patchValue(incredient?.amount);
      });
      // this.newOrEditRecipesForm.get(['ingredients', 'ingredientesName'])?.patchValue(this.recipesService?.incredient?.name);
      //   this.newOrEditRecipesForm.get(["ingredients", 'amount'])?.patchValue(this.recipesService?incredient?.amount);
    });
  }
  /**Esta foi Hack feito por mim, para resolver o problema de Não atualizar a imagem no template no tempo de excução do Angular */
  get changeImage(): Observable<{title: string, imagePath: string}> {
    let local = {title: '', imagePath: ''};
    this.idRecipe ? local  = {title : this.newOrEditRecipesForm.get("name")?.value,  imagePath: this.newOrEditRecipesForm.get("imagePath")?.value} : local = {title:'New Recipes', imagePath: ' ./../../../../assets/imgs/edite.jpg '} ;
    return of(local);
  }

  saveOrUpdade(templateForm: FormGroup) {
  console.log( templateForm.value);
 //   let localRecipe: RecipesModel = {  templateForm.get}
    this.recipesService.addOrUpdateRecipes(templateForm.value)
  }
}
