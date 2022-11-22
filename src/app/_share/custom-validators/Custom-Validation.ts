import { JsonPipe } from "@angular/common";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidation {


  /**Custom Validator que chega é um NUMERO ou Não */
  static justanumber = (control: AbstractControl): ValidationErrors | null => {
    /**Gerador https://regex-generator.olafneumann.org/ */
    const numericNumberReg: RegExp = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/i;
    return numericNumberReg.test(control.value) ? null : { justanumber: { description: "Is not a Number" } };
  }
}


