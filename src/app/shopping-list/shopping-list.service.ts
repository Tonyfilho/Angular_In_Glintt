import { Observable,  Subject, } from 'rxjs';
import { Injectable } from '@angular/core';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})

/**Usei a Opção de SUJECT no lugar de EventEmitter ou OF */
export class ShoppingListService {
 private ingredients: IngredientsModel[] = [new IngredientsModel("Oranges", 10,2), new IngredientsModel("Tomatoes", 5,3)];
 private ingredientsChanged: Subject<IngredientsModel[]>= new Subject<IngredientsModel[]>();


  constructor() {
    setInterval(() => { this.ingredientsChanged.next(this.ingredients)}, 0);
  }

  private createIngredientId(): number {
    const arraySize = this.ingredients.length + 1;
    return arraySize;
  }


  getIngredients(): Observable<IngredientsModel[]>{
    return this.ingredientsChanged;

  }

  newIngredient(localIngridient: IngredientsModel) {
    let addIngridient = new IngredientsModel(localIngridient.ingred_name, localIngridient.amount);
    this.ingredients.push(addIngridient);
    console.log("foi Adcionado", this.ingredients);

  }

 addOrUpdateIngredients(oneIngredient: IngredientsModel):IngredientsModel[] | undefined {
  let localIngredients: IngredientsModel[] = [];
  if (oneIngredient.ingred_id) {
     localIngredients = this.ingredients.filter(dataIngredients => dataIngredients.ingred_id !== oneIngredient.ingred_id);
     this.ingredients = [];
     localIngredients.push(oneIngredient);
     this.ingredients = localIngredients;
     return this.ingredients;

  }
  if (oneIngredient.ingred_name && oneIngredient.ingred_id == null) {

  }

  // let removeDuplicate: IngredientsModel[]= manyIngridients?.filter((este, i) => manyIngridients.indexOf(este) === i); /**Remove itens duplicados */
  //  this.ingredients = removeDuplicate ;
   /**Uso do SPREAD para disoulver o ARRAY para dentro do outro */
   return localIngredients;

 }


}



