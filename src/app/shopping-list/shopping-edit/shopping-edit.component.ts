import { ShoppingListService } from './../shopping-list.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientsModel } from 'src/assets/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {
  @Output("loadForm") loadForm = new EventEmitter<IngredientsModel>()
  myFormBuilder: FormGroup;
  constructor(private fb: FormBuilder, private shopService: ShoppingListService) {
    this.myFormBuilder = fb.group({
     name:[''],
     amount:['']
    })
   }

  ngOnInit(): void {
  }

  submitForms(localFormBuilder: FormGroup) {
    /**Foi Adcionado um Service sem precisar emitir dados localmente
    this.loadForm.emit({name: localFormBuilder.get("name")?.value, amount: localFormBuilder.get("amount")?.value });
     */
  // this.shopService.addIncredient.emit({name: localFormBuilder.get("name")?.value, amount: localFormBuilder.get("amount")?.value });
  this.shopService.plusIngredient({name: localFormBuilder.get("name")?.value, amount: localFormBuilder.get("amount")?.value });

    this.myFormBuilder.reset();
  }

}
