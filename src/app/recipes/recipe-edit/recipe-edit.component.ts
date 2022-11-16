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
      id: ['',{ disabled: true }],
      name: [''],
      description: [''],
      imagePath: [''],
      ingredients:
        fb.group({
          ingred_name: [''],
          amount: ['']
        })
    });
  }


  ngOnInit(): void {
    //  this.idRecipe = +this.route.snapshot.params['id'];
    this.changeButtonName(this.idRecipe);
  }

  /**Esta foi Hack feito por mim, para resolver o problema de Não atualizar a imagem no template no tempo de excução do Angular */
  get changeImage(): Observable<{title: string, imagePath: string}> {
    let local = {title: '', imagePath: ''};
    this.idRecipe ? local  = {title : this.newOrEditRecipesForm.get("name")?.value,  imagePath: this.newOrEditRecipesForm.get("imagePath")?.value} : local = {title:'New Recipes', imagePath: ' ./../../../../assets/imgs/edite.jpg '} ;
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
      console.log("ID", recipe?.id);
      this.newOrEditRecipesForm.get("name")?.patchValue(recipe?.name);
      this.newOrEditRecipesForm.get("description")?.patchValue(recipe?.description);
      this.newOrEditRecipesForm.get("imagePath")?.patchValue(recipe?.imagePath);

      /**MAPEADO e Pegando dados para o  ARRAY  de Form ou por direto  */
      recipe?.ingredients.map((incredient: IngredientsModel) => {
        this.newOrEditRecipesForm.get(['ingredients', 'ingred_name'])?.patchValue(incredient?.ingred_name);
        this.newOrEditRecipesForm.get(["ingredients", 'amount'])?.patchValue(incredient?.amount);
      });
    });
  }

  saveOrUpdade(templateForm: FormGroup) {
  let localRecipe:RecipesModel;
  /**Usando o Destruction */
  const {name, description, imagePath, id, ingredients: {ingred_name, amount}} = templateForm.value;
  console.log( 'Com DESTRUCTION',id, name, description, imagePath, ingred_name, amount );
  // console.log("Com o Form", templateForm.value);
  // this.recipesService.addOrUpdateRecipes(templateForm.value); /**Não podemos mandar uma OBJETO mesmo q tenha as mesma chaves, tem q ser mandado  o RECIPESMODEL */
  localRecipe = new RecipesModel(id, name, description, imagePath, [new IngredientsModel(ingred_name, amount)]);
  this.recipesService.addOrUpdateRecipes(localRecipe);
  }
}
