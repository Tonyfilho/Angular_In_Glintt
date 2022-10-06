import { RecipesModel } from './../../assets/models/recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css'
  ]
})
export class RecipesComponent implements OnInit {
  loadItemFrom!: RecipesModel;

  constructor() { }

  ngOnInit(): void {
  }

  loadItemFromList(event:{name: string, imagePath:string, description:string}) {
    console.log("In RecipesCompoment", event);
    this.loadItemFrom = event;
  }
}
