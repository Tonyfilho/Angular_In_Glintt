import { IngredientsModel } from './../../assets/models/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css'
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: IngredientsModel[] = [new IngredientsModel("Orages", 10), new IngredientsModel("Tomatoes", 5)];
  constructor() { }

  ngOnInit(): void {

  }

  getIngredients(oneIngridient: IngredientsModel) {

    this.ingredients.push(oneIngridient);
  }

}
