import { Observable } from 'rxjs';
import { IngredientsModel } from './../../assets/models/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css'
  ]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<IngredientsModel[]>;
  constructor(private shopService: ShoppingListService) {
    this.ingredients = this.shopService.getIngredients();
    console.log('Array de Ingredients',this.ingredients);

  }

  ngOnInit(): void {

  }



}
