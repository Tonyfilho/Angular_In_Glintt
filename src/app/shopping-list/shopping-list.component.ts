import { Observable } from 'rxjs';
import { IngredientsModel } from './../../assets/models/ingredients.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css'
  ]
})
export class ShoppingListComponent implements OnInit {
  @Output("fields") fields: EventEmitter<{ingred_name: string, amount: number | string, id: number | undefined}> = new EventEmitter();
  ingredients: Observable<IngredientsModel[]>;
  constructor(private shopService: ShoppingListService) {
    this.ingredients = this.shopService.getIngredients();
    // console.log('Array de Ingredients',this.ingredients);

  }

  ngOnInit(): void {

  }

  updateFieldOtherCompoment(ingredient: IngredientsModel) {
       this.fields.emit({ingred_name: ingredient.ingred_name, amount: ingredient.amount, id: ingredient.ingred_id});
  }


}
