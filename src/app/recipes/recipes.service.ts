import {  EventEmitter, Injectable, OnDestroy,  } from '@angular/core';
import {  Observable,  of, Subject, Subscription } from 'rxjs';
import { IngredientsModel } from 'src/assets/models/ingredients.model';
import { RecipesModel } from 'src/assets/models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnDestroy {
  private unSubscrition!: Subscription;
  private recipes: RecipesModel[] = [new RecipesModel(1, "Pirão", "Feito da Cabeça do Peixe e Farinha de mandioca", "https://cdn.ocp.news/2020/01/pirao-de-peixe.jpg", [new IngredientsModel("coentro", 5, 1)]),
  new RecipesModel(2, "Feijoada", "Feito com Feijão Preto e Parte de carne de Porco e Boi", "https://redesuldenoticias.com.br/content/uploads/2018/05/feijoada-receita.jpg", [new IngredientsModel("Pé de Porco", 2, 2)]),
  new RecipesModel(3, "Moqueca Capixaba", "Feito com um bom peixe e mais  camarão como optional", "https://www.hgnoticias.com.br/wp-content/uploads/2015/07/moqueca-capixaba.jpg", [new IngredientsModel("Camarão", 2, 3)]),]
  hidenButtonRemove = new Subject<{hiddeButon: boolean, title: string}>(); /**Usarei o SUBJECT no lugar do EventEmitter, faz a mesma coisa */

  recipeChanged = new EventEmitter<RecipesModel[]>(); /**Emite o evento para cada alteração da VAR  */


  constructor() {
   /*******************Foi posto este SteInterval para evitar que EventEmitter retorne UNDEFINE */
   setInterval(() => this.recipeChanged.emit(this.recipes), 0);
  }

  getRecipesWithOF(): Observable<RecipesModel[]> {
    /**Retornando o SLICE(), sempre retorno uma NOVA copia da memoria e não o array original */
    return of(this.recipes);
  }
  getRecipesEmitter(): Observable<RecipesModel[]> {
    return this.recipeChanged.asObservable();
  }


  getReceipesById(id: number): Observable<RecipesModel> {
    let oneRecipe: RecipesModel | any = this.recipes.find(data => id === data.id);
    return of(oneRecipe);
  }

  getReceipesByIdWithPartial(id: number): Observable<Partial<RecipesModel>> {
    let oneRecipe: RecipesModel | any = this.recipes.find(data => id === data.id);
    return of(oneRecipe) as Observable<Partial<RecipesModel>>;
  }

  private createRecipesId(): number {
    const arraySize = this.recipes.length + 1;
    return arraySize;
  }


  addOrUpdateRecipes(recipe: RecipesModel) {
    let localRecipe: RecipesModel[] = [];
    console.log("recipe no server : ", recipe);
    if (recipe.id) {
      localRecipe = [...this.recipes.filter(data => data.id !== recipe.id)];
      this.recipes = [];
      localRecipe.push(recipe);
      return this.recipes = [...localRecipe];
    }
    recipe['id'] = this.createRecipesId();
    return this.recipes.push(recipe);
  }

  deleteOneRecipe(id: number) {
    let localRecipe: RecipesModel[];
    if(id) {
      localRecipe = this.recipes.filter((recipeDeleted: RecipesModel) => id !== recipeDeleted.id); /**Quero Todos MENOS oq ue ID igual. */
      this.recipes.length = 0;
      this.recipes = [...localRecipe];
      return this.recipes;
    }
    return window.alert("No have recipe with this Id");
  }

  ngOnDestroy(): void {
    this.unSubscrition.unsubscribe();
  }



}
