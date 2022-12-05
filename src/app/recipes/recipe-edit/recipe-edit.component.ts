import { CustomValidation } from './../../_share/custom-validators/Custom-Validation';
import { Observable, of } from 'rxjs';
import { IngredientsModel } from './../../../assets/models/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';



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
  constructor(private fb: FormBuilder, private recipesService: RecipesService, private route: ActivatedRoute, private shoppingListService: ShoppingListService) {

    this.route.params.subscribe((data: Params) => { this.idRecipe = +data['id'] }); /**Rotas Asyncronas tem que ser carregadas no CONSTRUTOR */
    this.newOrEditRecipesForm = fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      imagePath: ['', [Validators.required]],
      ingredients: fb.array([
        fb.group({
          ingred_name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          amount: [null, [CustomValidation.justanumber, Validators.required, Validators.minLength(1)]],
          ingred_id: []
        })
      ])
    });
  }


  ngOnInit(): void {
    //  this.idRecipe = +this.route.snapshot.params['id'];
    this.changeButtonName(this.idRecipe);


  }

  /**Pegando o array do form para passar no template */
  get ingredientsArray(): FormArray {
    return this.newOrEditRecipesForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredientsArray.push(this.fb.group({
      ingred_name: [],
      amount: [],
      ingred_id: [this.shoppingListService.createIngredientId()]


    }));
  }

  /**Esta foi Hack feito por mim, para resolver o problema de Não atualizar a imagem no template no tempo de excução do Angular */
  get changeImage(): Observable<{ title: string, imagePath: string }> {
    let local = { title: '', imagePath: '' };
    local = { title: this.newOrEditRecipesForm.get("name")?.value, imagePath: this.newOrEditRecipesForm.get("imagePath")?.value };
    return of(local);
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
      /*************Mapeando e passando INDEX para dentro FormARRAY********************************************************* */
      recipe?.ingredients.map((incredient: IngredientsModel, index: number) => {
        // this.ingredientsArray.controls[index]?.patchValue({ ingred_name: incredient?.ingred_name, amount: incredient?.amount, ingred_id: incredient.ingred_id }) somente p 1
          this.ingredientsArray.push(this.fb.group({ ingred_name: incredient?.ingred_name, amount: incredient?.amount, ingred_id: incredient.ingred_id }))

      });

    });

  }

  saveOrUpdade(templateForm: FormGroup) {
    console.log(templateForm);
    /**É Opcional receber dentro do Submit o paramentro TemplateForm, pois no ReactiveForm ja temos acesso aos dados via FormGroup */
    let dummyWithDestruction: RecipesModel;
    /**Usando o Destruction com array funciona somente no index 0 , os NOVOS itens do array não atualizam*/
    const { name, description, imagePath, id, ingredients: [{ ingred_name, amount, ingred_id }] } = templateForm.value;
    dummyWithDestruction = new RecipesModel(id, name, description, imagePath, [new IngredientsModel(ingred_name, amount, ingred_id)]);
    /****************************** fim do Dummy************************************ */

    let localRecipe: RecipesModel;
    localRecipe = new RecipesModel(templateForm.value['id'], templateForm.value['name'], templateForm.value['description'], templateForm.value['imagePath'], templateForm.value['ingredients']);
    this.recipesService.addOrUpdateRecipes(localRecipe);
  }


  removeIngredient(id: number) {
 //  this.recipesService.removeIngredient(id); ire ser removido pelo Form, é mais pratico eo proprio removeAT(idex) e depois update ja ira atualiza o form no server
 /**Pegando o index do array e  */
  let indexArrayToRemove = this.ingredientsArray.controls.findIndex(item => item.value['ingred_id'] == id);
  /**A melhor opção é pegar o Index e usar RemoveAt(Index), pois desta forma usamos a mesma Logica de Adcionar*/
 this.ingredientsArray.removeAt(indexArrayToRemove);
  }

  
}
