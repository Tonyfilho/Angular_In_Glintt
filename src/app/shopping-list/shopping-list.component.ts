import { Ingredients } from './../../assets/models/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] = [new Ingredients("Orages", 10), new Ingredients("Tomatoes", 5)];
  constructor() { }

  ngOnInit(): void {
  }

}
