import { Observable, of } from 'rxjs';
import { IngredientsModel } from './../../../assets/models/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  // @ViewChild('localImage') image: string | undefined = "";
  nameButton: string = ''
  idRecipe!: number;
  // image$: Observable<string>;
  newOrEditRecipesForm: FormGroup;
  newRecipes!: Partial<RecipesModel>;
  constructor(private fb: FormBuilder, private recipesService: RecipesService, private route: ActivatedRoute) {
    // this.image$ = new Observable((subs) => subs.next(' ./../../../../assets/imgs/edite.jpg '));
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
  // ngAfterViewChecked(): void {
  //   console.log(this.newOrEditRecipesForm.get("imagePath")?.value)
  //   this.newRecipes['imagePath'] = this.newOrEditRecipesForm.get("imagePath")?.value;
  // }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     console.log("no after: ", this.newRecipes?.imagePath);
  //     this.image = this.newRecipes?.imagePath;

  //   },0)
  // }

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

      recipe?.ingredients.map((incredient: IngredientsModel) => {
        /**MAPEADO e Pegando dados para o  ARRAY  de Form  */
        this.newOrEditRecipesForm.get(['ingredients', 'ingredientesName'])?.patchValue(incredient?.name);
        this.newOrEditRecipesForm.get(["ingredients", 'amount'])?.patchValue(incredient?.amount);
      });

    });
  }
  /**Esta foi Hack feito por mim, para resolver o problema de Não atualizar a imagem no template no tempo de excução do Angular */
  get changeImage(): Observable<{title: string, imagePath: string}> {
    let local = {title: '', imagePath: ''};
    this.idRecipe ? local  = {title : this.newOrEditRecipesForm.get("name")?.value,  imagePath: this.newOrEditRecipesForm.get("imagePath")?.value} : local = {title:'New Recipes', imagePath: ' ./../../../../assets/imgs/edite.jpg '} ;
    return of(local);
  }

}
