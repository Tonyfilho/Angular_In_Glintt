import { Observable } from 'rxjs';
import { IngredientsModel } from '../_share/models/ingredients.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css'
  ]
})
export class ShoppingListComponent implements OnInit {
  fields!: IngredientsModel;
  ingredients: Observable<IngredientsModel[]>;
  constructor(private shopService: ShoppingListService) {
    this.ingredients = this.shopService.getIngredients();
    // console.log('Array de Ingredients',this.ingredients);

  }

  ngOnInit(): void {

  }

  updateFieldOtherCompoment(ingredient: IngredientsModel) {

     this.shopService.shareIngredientBetweenCompoments.emit(ingredient);
  }


}
