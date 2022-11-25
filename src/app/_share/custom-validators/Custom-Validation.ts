import { IngredientsModel } from './../../../assets/models/ingredients.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { of } from 'rxjs';

export class CustomValidation {

  static shoppingList = new ShoppingListService();

  /**Staticos não aceita construtor */
  constructor(private shoppingListService: ShoppingListService) { }


  /**Custom Validator que chega é um NUMERO ou Não */
  static justanumber = (control: AbstractControl): ValidationErrors | null => {
    /**Gerador https://regex-generator.olafneumann.org/ */
    const numericNumberReg: RegExp = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/i;
    return numericNumberReg.test(control.value) ? null : { justanumber: { description: "Is not a Number" } };
  }



  /**Static Variable and AsyncValidators */
  static isRepeated = (control: AbstractControl): ValidationErrors | null => {
    CustomValidation.shoppingList.getIngredients().subscribe((data: IngredientsModel[]) => {
      data.filter(ingredient => ingredient.ingred_name.toLowerCase() === control.value).map(() =>
        control.setErrors({ repeated: { descrition: " Item already exist in your list " } }))
    })
    return null

  }
}


