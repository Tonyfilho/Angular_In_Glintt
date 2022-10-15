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
  /**Foi Criado o Service, e lá será populado o valor
   ingredients: IngredientsModel[] = [new IngredientsModel("Orages", 10), new IngredientsModel("Tomatoes", 5)];
   */
  ingredients !: Observable<IngredientsModel[]>;
  constructor(private shopService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();

  }



}
