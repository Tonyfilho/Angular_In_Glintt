import { Observable } from 'rxjs';
import { RecipesService } from './../recipes.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: [ './recipes-detail.Component.css']
})
export class RecipesDetailComponent implements OnInit {
  // @Input("loadItemInReceipeCompoment") loadItem!: RecipesModel | any ;
  loadItem!: Observable<RecipesModel | any> ;
  loadItemById!: number;
  @Output("closeRecipes") closeRecipe = new EventEmitter<boolean>()
  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {this.loadItemById = +data['id'],
    this.loadItem = this.recipeService.getReceipesById(this.loadItemById);
    console.log(this.loadItem , "Obsevable");


  });


    // console.log("In RecipesDetailCompoment: ", this.loadItem?.ingredients);
  }

  sendGoodsToshoppingList() {
  //  this.shoppingListService.addIngredients(this.loadItem?.ingredients);
  }



  closeRecipes() {
    this.closeRecipe.emit(true)

  }

}
