import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: [ './recipes-detail.Component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input("loadItemInReceipeCompoment") loadItem!: RecipesModel | any ;
  @Output("closeRecipes") closeRecipe = new EventEmitter<boolean>()
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    console.log("In RecipesDetailCompoment: ", this.loadItem?.ingredients);
  }

  sendGoodsToshoppingList() {
   this.shoppingListService.addIngredients(this.loadItem?.ingredients);
  }



  closeRecipes() {
    this.closeRecipe.emit(true)

  }

}
