import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, exhaustMap, map, of, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { RecipesModel } from 'src/assets/models/recipes.model';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  FIREBASELINK: string = "https://ng-course-recipe-book-aa8c0-default-rtdb.europe-west1.firebasedatabase.app";
  RECIPES: string = "/recipes.json"
  recipes: Observable<RecipesModel[]>;
  /**
   * 1º temos que pegar o TOKEN do Usuario para mandar para Realtime para termos acesso aos dados
   * 2º Usaremos o TAKE(1), para fazermos 1 subscrição no Observable e ele fazer automaticamente o Unsubscribe
   * 3º Usaremos o EXAUSTMAP(), que receberá os dados do TAKE e criará um novo Observable para juntarmos o Token com a Auteticação.
   * 4º setar a propriedade "params"  params: new HttpParams().set('auth', user.token)
   *
   */

  constructor(private httpClient: HttpClient, private recipeService: RecipesService, private auth: AuthService) {
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
   *
   */
  fetchRecipes() {
    return this.httpClient.get<RecipesModel[]>(this.FIREBASELINK + this.RECIPES).pipe(map(recipesRXJS => {
      return recipesRXJS.map(recipeJSArray => {
        return { ...recipeJSArray, ingredients: recipeJSArray.ingredients ? recipeJSArray.ingredients : [] }
      })
    }), tap(data => { console.log('fetchData: ', data); this.recipeService.setRecipes(data) }))

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
   * 4º Add o Token como query paramentro no request this.FIREBASELINK + this.RECIPES + '?auth=' + user.token ou
   * por pelo Objeto Params
   */
  fetchRecipesWithAuth() {
    return this.auth.localUserLogin.pipe(take(1), exhaustMap(user => {
      return this.httpClient.get<RecipesModel[]>(this.FIREBASELINK + this.RECIPES + '?auth=' + user.token, {
        params: new HttpParams().set('auth', user.token)
      });
    }),
      map(recipesRXJS => {
        return recipesRXJS.map(recipeJSArray => {
          return { ...recipeJSArray, ingredients: recipeJSArray.ingredients ? recipeJSArray.ingredients : [] }
        })
      }), tap(data => { console.log('fetchData: ', data); this.recipeService.setRecipes(data) })

    )
  }
  /**OBS
 * 1º TypeScritp não sabe que DATA que vem do HTTP é do mesmo formato que o RecipesModel[],
 * por isto temos que fazer um CAST this.httpClient.get<RecipesModel[]>,
 * 2ª usaremos 2 Map,
 * o 1º MAP é do RXJS , para continuar a retornar CADA  Observable da lista
 * e o 2º Map será do Js Array, Ja com o retorno RXJS, iremos pegar cada Item do Array de Observable
 * e com MAP do JS,  usando Spread para recompor o NOVO Objeto e iremos set o Objeto Ingredient,
 * pois desta forma protegeremos a rota caso não Haja itens na URL adcionado pelo usuario, e temos que retornar o Fetch
 * 3º Add o Token como query paramentro no request this.FIREBASELINK + this.RECIPES  usando a interface Interceptor
 * do serviço AuthInterceptor
 */
  fetchRecipesWithAuthAndInterceptor() {

    return this.httpClient.get<RecipesModel[]>(this.FIREBASELINK + this.RECIPES).pipe(
      map(recipesRXJS => {
        return recipesRXJS.map(recipeJSArray => {
          return { ...recipeJSArray, ingredients: recipeJSArray.ingredients ? recipeJSArray.ingredients : [] }
        })
      })
      , tap(data => { console.log('fetchData: ', data); this.recipeService.setRecipes(data) })
    )


  }




}//end class
