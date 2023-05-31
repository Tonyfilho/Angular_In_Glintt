import { Observable, Subscription } from 'rxjs';
import { RecipesService } from './../recipes.service';

import { RecipesModel } from '../../_share/models/recipes.model';
import { Component,  OnInit,  OnDestroy } from '@angular/core';
import { ActivatedRoute,  Params,  } from '@angular/router';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.Component.css']
})
export class RecipesDetailComponent implements OnInit, OnDestroy {
 private unSubscrible$$!: Subscription;
  loadItem$!: Observable<RecipesModel>;
  loadTest$!: Observable<RecipesModel>; /**Dummy para testar o Switchmap */
  loadItemObject!: RecipesModel;
  hiddenRemoveButton: any = { hiddeButon: false, title: 'Recipe Details' };

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) {
    this.unSubscrible$$ = this.recipeService.hidenButtonRemove.subscribe(remove => {
      this.hiddenRemoveButton['hiddeButon'] = remove['hiddeButon'];
      this.hiddenRemoveButton['title'] = remove['title'];


    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      //  this.loadItemById = +data['id'],
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
  ngOnDestroy(): void {
   this.unSubscrible$$.unsubscribe;
  }




  /**Este Metodo é acionado somente do RemoveComponent , pois ele compartilha o mesmo template html que este */
  deleteRecipe(id: number | undefined) {

  }

}
