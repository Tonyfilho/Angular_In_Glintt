import { Observable,  Subject, } from 'rxjs';
import { Injectable } from '@angular/core';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})

/**Usei a Opção de SUJECT no lugar de EventEmitter ou OF */
export class ShoppingListService {
 private ingredients: IngredientsModel[] = [new IngredientsModel("Orages", 10), new IngredientsModel("Tomatoes", 5)];
 private ingredientsChanged: Subject<IngredientsModel[]>= new Subject<IngredientsModel[]>();

  constructor() {
    setInterval(() => { this.ingredientsChanged.next(this.ingredients)}, 0);
  }


  getIngredients(): Observable<IngredientsModel[]>{
    return this.ingredientsChanged;

  }

  newIngredient(localIngridient: IngredientsModel) {
    let addIngridient = new IngredientsModel(localIngridient.ingred_name, localIngridient.amount);
    this.ingredients.push(addIngridient);
    console.log("foi Adcionado", this.ingredients);

  }

 addIngredients(manyIngridients: IngredientsModel[]) {
  let removeDuplicate: IngredientsModel[]= manyIngridients?.filter((este, i) => manyIngridients.indexOf(este) === i); /**Remove itens duplicados */
   this.ingredients = removeDuplicate ; /**Uso do SPREAD para disoulver o ARRAY para dentro do outro */

 }


}



