import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
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
   return  this.recipes.subscribe((data: RecipesModel[]) => {
      this.httpClient.put(this.FIREBASELINK + this.RECIPES, data).subscribe(response => console.log("Our Response: ", response));
    })
  }


}
