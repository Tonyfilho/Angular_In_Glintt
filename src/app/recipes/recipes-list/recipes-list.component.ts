import { Observable } from 'rxjs';
import { RecipesService } from './../recipes.service';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.Component.css']

})
export class RecipesListComponent implements OnInit {
  recipes$: Observable<RecipesModel[]>;
  recipes$$!: RecipesModel[];

  constructor(private recipesService: RecipesService) {
    this.recipes$ = this.recipesService.getRecipesWithOF();
  }

  ngOnInit(): void {
    this.recipesService.recipeChanged.subscribe((recipes:RecipesModel[]) => {  this.recipes$$= recipes, console.log("EventEmitter: ", recipes)}) ;
  }

  /**Pegaremos o dados direto no compomente pelo service
 loadItemFrom(oneLoad:{name: string, imagePath:string, description:string}){
   this.loadItemInList.emit(oneLoad);
  }
*/
}
