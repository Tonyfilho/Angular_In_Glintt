import { RecipesModel } from '../../_share/models/recipes.model';
import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit, } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remove-recipe',

  templateUrl: './../recipes-detail/recipes-detail.component.html',
  styleUrls: ['./../recipes-detail/recipes-detail.component.css']
})
export class RemoveRecipeComponent implements OnInit {

 loadItem$!: Observable<RecipesModel>; /**Variavel que pertence ao Recipes-details por compatilhar o mesmo template.HTML tem que existir em ambos */
 hiddenRemoveButton: any = {hiddeButon: true, title: 'Remove Recipe Are Sure?'}; /**Variavel que pertence ao Recipes-details por compatilhar o mesmo template.HTML tem que existir em ambos  */

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {
        route.params.subscribe((data: Params) => {
          this.loadItem$ = this.recipesService.getReceipesById(+data['id']);
        })
   }

  ngOnInit(): void {
  //  setInterval(() => {this.recipesService.hidenButtonRemove.emit({hiddeButon: false, title: 'Remove Recipe Are Sure?'})}, 0) ;
  this.recipesService.hidenButtonRemove.next({hiddeButon: true, title: 'Remove Recipe Are Sure?'});
  }


  deleteRecipe(id: number | undefined) {
       if(id) {
          this.recipesService.deleteOneRecipe(id);

       }
  }

}
