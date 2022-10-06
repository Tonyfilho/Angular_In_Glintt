import { RecipesModel } from './../../../../assets/models/recipes.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: [ './recipes-item.Component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input("items") recipesItem!: RecipesModel ;
  @Output("loadItem") loadItem = new EventEmitter<{name: string, imagePath:string, description:string}>();
  constructor() { }

  ngOnInit(): void {
  }

  getItem(oneRecipes:{name: string, imagePath:string, description:string}) {
  console.log("In RecipesItemCompoment: " , oneRecipes);
  this.loadItem.emit(oneRecipes);
  }


}
