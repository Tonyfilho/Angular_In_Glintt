import { Observable,  Subject, } from 'rxjs';
import { Injectable } from '@angular/core';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})

/**Usei a Opção de SUJECT no lugar de EventEmitter ou OF */
export class ShoppingListService {
 private ingredients: Subject<IngredientsModel[]>= new Subject<IngredientsModel[]>();

  constructor() {
    setInterval(() => { this.ingredients.next([new IngredientsModel("Orages", 10), new IngredientsModel("Tomatoes", 5)])}, 0);
  }


  getIngredients(): Observable<IngredientsModel[]>{
    return this.ingredients;

  }

  updateIngredient(localIngridient: IngredientsModel):Observable<IngredientsModel[]> {
    let addIngridient = new IngredientsModel(localIngridient.ingred_name, localIngridient.amount);
    this.ingredients.next([addIngridient]);
    console.log("foi Adcionado", this.ingredients);
    return  this.ingredients;
  }

 addIngredients(manyIngridients: IngredientsModel[]): Observable<IngredientsModel[]>{
  let removeDuplicate: IngredientsModel[]= manyIngridients?.filter((este, i) => manyIngridients.indexOf(este) === i); /**Remove itens duplicados */
   this.ingredients.next(removeDuplicate); /**Uso do SPREAD para disoulver o ARRAY para dentro do outro */
   return this.ingredients;
 }


}



