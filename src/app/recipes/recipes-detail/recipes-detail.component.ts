import { Observable, switchMap } from 'rxjs';
import { RecipesService } from './../recipes.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipesModel } from './../../../assets/models/recipes.model';
import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Data, Params, UrlSegment } from '@angular/router';
import { RemoveRecipeComponent } from '../remove-recipe/remove-recipe.component';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.Component.css']
})
export class RecipesDetailComponent implements OnInit {

  loadItem$!: Observable<RecipesModel>;
  loadTest$!: Observable<RecipesModel>; /**Dummy para testar o Switchmap */
  loadItemObject!: RecipesModel;
  hidenRemoveButton: any = {hideButon: false, title: 'Recipe Details?'};

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
        this.loadItem$ = this.recipeService.getReceipesById(+data['id']);
    });
    

    /**Dummy Usando SwitchMap, e Pipe Async
    this.loadTest$ = this.route.params.pipe(switchMap((data: Params) => this.recipeService.getReceipesById(+data['id'])));
    */
    /**Dummy Usando SwitchMap
    const obs = this.route.params.pipe(switchMap((data:Params) => { console.log(data); return this.recipeService.getReceipesById(+data['id'])}));
    obs.subscribe((data: RecipesModel) => { this.loadItemObject = data;  });
 */
  }




  /**Este Metodo é acionado somente do RemoveComponent , pois ele compartilha o mesmo template html que este */
  deleteRecipe(id: number | undefined) {

  }

}
