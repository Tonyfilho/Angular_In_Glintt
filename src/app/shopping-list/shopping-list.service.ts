import { Observable, of } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
 private ingredients: IngredientsModel[] = [new IngredientsModel("Orages", 10), new IngredientsModel("Tomatoes", 5)];

  constructor() {}


  getIngredients(): Observable<IngredientsModel[]>{
    return of(this.ingredients);

  }

  plusIngredients(localIngridient: IngredientsModel): IngredientsModel[] {
    let addIngridient = new IngredientsModel(localIngridient.name, localIngridient.amount);
    this.ingredients.push(addIngridient);
    console.log("foi Adcionado", this.ingredients);
    return  this.ingredients;
  }




}



