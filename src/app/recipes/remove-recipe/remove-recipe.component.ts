import { RecipesModel } from './../../../assets/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remove-recipe',

  templateUrl: './../recipes-detail/recipes-detail.component.html',
  styleUrls: ['./../recipes-detail/recipes-detail.component.css']
})
export class RemoveRecipeComponent implements OnInit {

 loadItem$!: Observable<RecipesModel>;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {
        route.params.subscribe((data: Params) => {
          this.loadItem$ = this.recipesService.getReceipesById(+data['id']);
        })
   }

  ngOnInit(): void {
    this.recipesService.hidenButtonRemove.emit({hideButon: true, title: 'Remove Recipe Are Sure?'});
  }


  deleteRecipe(id: number | undefined) {
       if(id) {
          this.recipesService.deleteOneRecipe(id);

       }
  }

}
