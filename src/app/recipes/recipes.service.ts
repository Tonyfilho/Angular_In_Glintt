import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { filter, Observable, ObservableInput, of, Subscription, switchMap } from 'rxjs';
import { IngredientsModel } from 'src/assets/models/ingredients.model';
import { RecipesModel } from 'src/assets/models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnDestroy {
  private unSubscrition!: Subscription;
  private recipes: RecipesModel[] = [new RecipesModel(1, "Pirão", "Feito da Cabeça do Peixe e Farinha de mandioca", "https://cdn.ocp.news/2020/01/pirao-de-peixe.jpg", [new IngredientsModel("coentro", 5)]),
  new RecipesModel(2, "Feijoada", "Feito com Feijão Preto e Parte de carne de Porco e Boi", "https://redesuldenoticias.com.br/content/uploads/2018/05/feijoada-receita.jpg", [new IngredientsModel("Pé de Porco", 2)]),
  new RecipesModel(3, "Moqueca Capixaba", "Feito com um bom peixe e mais  camarão como optional", "https://www.hgnoticias.com.br/wp-content/uploads/2015/07/moqueca-capixaba.jpg", [new IngredientsModel("Camarão", 2)]),]
  // private recipes$: Observable<RecipesModel[]> = new Observable(observer => {  observer.next(this.recipes)  });

  recipeChanged = new EventEmitter<RecipesModel[]>(); /**Emite o evento na recipe-item , n será mais usado foi substituido pelo getReceipesById  */


  constructor() {
    this.recipeChanged.emit(this.recipes);

  }

  getRecipesWithOF(): Observable<RecipesModel[]> {
    /**Retornando o SLICE(), sempre retorno uma NOVA copia da memoria e não o array original */
    return of(this.recipes);
  }
 

  getReceipesById(id: number): Observable<RecipesModel> {
    let oneRecipe: RecipesModel | any = this.recipes.find(data => id === data.id);
    // console.log("service recipe: ", oneRecipe);
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
      //  localRecipe.push(new RecipesModel(recipe.id, recipe.name, recipe.description, recipe.imagePath, [...recipe.ingredients.map(d => { return new IngredientsModel(d.ingred_name,  d.amount)})]));
      localRecipe.push(recipe);
      this.recipeChanged.emit(localRecipe);
      return this.recipes = [...localRecipe], console.log('recipe updated', this.recipes);
    }

    console.log("dentro do else: ", recipe);
    recipe['id'] = this.createRecipesId();
    this.recipeChanged.emit(localRecipe);
    return this.recipes.push(recipe);


  }
  ngOnDestroy(): void {
    this.unSubscrition.unsubscribe();
  }



}
