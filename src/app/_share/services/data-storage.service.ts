import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, map, of, tap } from 'rxjs';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { RecipesModel } from 'src/assets/models/recipes.model';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  FIREBASELINK: string = "https://ng-course-recipe-book-aa8c0-default-rtdb.europe-west1.firebasedatabase.app";
  RECIPES: string = "/recipes.json"
  recipes: Observable<RecipesModel[]>;

  constructor(private httpClient: HttpClient, private recipeService: RecipesService) {
    /**Recuperando a lista de recipes usando services, é outra opção para não usar um metodo com paramentro */
    this.recipes = recipeService.getRecipesEmitter();




  }

  saveRecipes() {

    /**Usaremos o metodo PUT para sobre escrever qualquer dado anterior, no lugar do POST */
    return this.recipes.subscribe((data: RecipesModel[]) => {
      this.httpClient.put(this.FIREBASELINK + this.RECIPES, data).subscribe(response => console.log("Our Response: ", response));
    })
  }

  /**OBS
   * 1º TypeScritp não sabe que DATA que vem do HTTP é do mesmo formato que o RecipesModel[],
   * por isto temos que fazer um CAST this.httpClient.get<RecipesModel[]>,
   * 2ª usaremos 2 Map,
   * o 1º MAP é do RXJS , para continuar a retornar CADA  Observable da lista
   * e o 2º Map será do Js Array, Ja com o retorno RXJS, iremos pegar cada Item do Array de Observable
   * e com MAP do JS,  usando Spread para recompor o NOVO Objeto e iremos set o Objeto Ingredient,
   * 3ª saremos o TAP() para buscar os dados, mas o Subscrição ira ocorrer lá no RECIPES-RESOLVER
   * pois desta forma protegeremos a rota caso não Haja itens na URL adcionado pelo usuario, e temos que retornar o Fetch
   */
  fetchRecipes() {
  return  this.httpClient.get<RecipesModel[]>(this.FIREBASELINK + this.RECIPES).pipe(map(recipesRXJS => {
      return  recipesRXJS.map(recipeJSArray => {
        return {...recipeJSArray, ingredients:recipeJSArray.ingredients ? recipeJSArray.ingredients: []}
      })
    }), tap(data => { console.log('fetchData: ', data); this.recipeService.setRecipes(data)} ))

  }

}
