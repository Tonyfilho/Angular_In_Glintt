import { CustomValidation } from './../../_share/custom-validators/Custom-Validation';
import { ShoppingListService } from './../shopping-list.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IngredientsModel } from 'src/app/_share/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {


  localPattern= "^[1-9]+[0-9]*$";
  myFormBuilder: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, private shopService: ShoppingListService) {
    this.myFormBuilder = fb.group({
      ingred_name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), CustomValidation.isRepeated]],
     amount:['', [Validators.required, CustomValidation.justanumber, Validators.pattern(this.localPattern)]],
     id:[null]
    },/* {validators: [CustomValidation.isRepeated]}*/)
   }

  ngOnInit(): void {

    this.shopService.shareIngredientBetweenCompoments.subscribe((localFields: IngredientsModel) =>  {

     /* posso setar item a item  */
     /*  this.myFormBuilder.get("ingred_name")?.patchValue(localFields?.ingred_name);
      this.myFormBuilder.get("amount")?.patchValue(localFields?.amount);
      this.myFormBuilder.get("id")?.patchValue(localFields?.ingred_id); */

    /** Ou Passo Setar todo Objeto  */
     this.myFormBuilder.setValue({
      ingred_name: localFields.ingred_name,
      amount: localFields.amount,
      id: localFields.ingred_id
     });
    });


  }

  submitForms() {

  this.shopService.addOrUpdateIngredients(new IngredientsModel( this.myFormBuilder.get("ingred_name")?.value,  this.myFormBuilder.get("amount")?.value , this.myFormBuilder.get("id")?.value));
    this.myFormBuilder.reset();
  }

  deleteIngredient() {
   this.shopService.removeIngredient(this.myFormBuilder.get("id")?.value);
   this.myFormBuilder.reset();
  }








}
