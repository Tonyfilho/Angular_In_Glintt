import { Observable,  Subject, } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})

/**Usei a Opção de SUJECT no lugar de EventEmitter ou OF */
export class ShoppingListService {
 shareIngredientBetweenCompoments: EventEmitter<IngredientsModel> = new EventEmitter<IngredientsModel>();
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



 addOrUpdateIngredients(oneIngredient: IngredientsModel): IngredientsModel[] {
   // let removeDuplicate: IngredientsModel[]= manyIngridients?.filter((este, i) => manyIngridients.indexOf(este) === i); /**Remove itens duplicados */
 console.log("no service ", oneIngredient)
  let localIngredients: IngredientsModel[] = [];
  if (oneIngredient.ingred_id) {
     localIngredients = this.ingredients.filter(dataIngredients => dataIngredients.ingred_id !== oneIngredient.ingred_id);
     this.ingredients = [];
     localIngredients.push(oneIngredient);
     this.ingredients = [...localIngredients];
     return this.ingredients;
  }
  oneIngredient.ingred_id = this.createIngredientId();
    this.ingredients.push(oneIngredient);
   return this.ingredients;
 }

 removeIngredient(id: number): IngredientsModel[] {
  if (id) {
    const  localIngredients:IngredientsModel[] = this.ingredients.filter(dataIngredient => dataIngredient.ingred_id !== id);
    this.ingredients.length = 0;
    return this.ingredients = localIngredients;

  }
   alert("The ingredients does not exist or: " + id)
  return this.ingredients;
 }

}



