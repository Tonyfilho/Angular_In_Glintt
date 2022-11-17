import { RecipesService } from './recipes.service';
import { RecipesModel } from './../../assets/models/recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css'
  ]
})
export class RecipesComponent implements OnInit {
  loadItemFrom!: RecipesModel | any;


  constructor(private recipesService: RecipesService) {

   }

  ngOnInit(): void {
    this.recipesService.recipeChanged.subscribe((recipe: RecipesModel) => {
      this.loadItemFrom = recipe;
    })
  }
  //Obs: Posso Passar o $EVENT direto no template sem precisar  cria aqui a função loadItemFromList desta forma Ex:(loadItemInList)="loadItemFrom=$event"

  // loadItemFromList(event:{name: string, imagePath:string, description:string}) {
  //   console.log("In RecipesCompoment", event);
  //   this.loadItemFrom = event;
  // }


}
