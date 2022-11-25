import { CustomValidation } from './../../_share/custom-validators/Custom-Validation';
import { ShoppingListService } from './../shopping-list.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {
  @Output("loadForm") loadForm = new EventEmitter<IngredientsModel>()
  localPattern= "^[1-9]+[0-9]*$";
  myFormBuilder: FormGroup;
  constructor(private fb: FormBuilder, private shopService: ShoppingListService) {
    this.myFormBuilder = fb.group({
      ingred_name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), CustomValidation.isRepeated]],
     amount:['', [Validators.required, CustomValidation.justanumber, Validators.pattern(this.localPattern)]]
    },/* {validators: [CustomValidation.isRepeated]}*/)
   }

  ngOnInit(): void {
  }

  submitForms() {
  this.shopService.newIngredient({ingred_name: this.myFormBuilder.get("ingred_name")?.value, amount: this.myFormBuilder.get("amount")?.value });
    this.myFormBuilder.reset();
  }

  deleteIngredient() {


  }

  updateFormByClick(event: {ingred_name: string, amount: number | string, id: number | undefined}) {

  }
}
