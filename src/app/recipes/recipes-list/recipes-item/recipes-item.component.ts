import { RecipesService } from './../../recipes.service';
import { RecipesModel } from './../../../../assets/models/recipes.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: [ './recipes-item.Component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input("items") recipesItem!: RecipesModel ;
  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {  }




}
