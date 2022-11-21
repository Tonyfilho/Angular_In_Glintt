import { AbstractControl, ValidationErrors } from "@angular/forms";



export function justanumber(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
 // const re = /^-?[0-9]\d*(\.\d{1,2})?$/;
  const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  const valid = value.pattern(numericNumberReg);
  return valid ? null : {ssn: {description: "Is not a Number"}};
}

