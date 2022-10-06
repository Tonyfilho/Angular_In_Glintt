import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: [ './recipes-item.Component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input("items") recipesItem!: {name: string, imagePath:string, description:string} ;
  constructor() { }

  ngOnInit(): void {
  }

  getItem(oneRecipes:{name: string, imagePath:string, description:string}) {
  console.log("Item: " , oneRecipes);
  }
}
