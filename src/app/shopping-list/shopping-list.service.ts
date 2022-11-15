import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
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

  plusIngredient(localIngridient: IngredientsModel): IngredientsModel[] {
    let addIngridient = new IngredientsModel(localIngridient.ingred_name, localIngridient.amount);
    this.ingredients.push(addIngridient);
    console.log("foi Adcionado", this.ingredients);
    return  this.ingredients;
  }

 addIngredients(manyIngridients: IngredientsModel[]): IngredientsModel[]{
  let removeDuplicate: IngredientsModel[]= manyIngridients?.filter((este, i) => manyIngridients.indexOf(este) === i); /**Remove itens duplicados */
   this.ingredients.push(...removeDuplicate); /**Uso do SPREAD para disoulver o ARRAY para dentro do outro */
   return this.ingredients;
 }


}



