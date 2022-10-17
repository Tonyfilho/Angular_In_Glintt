import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IngredientsModel } from 'src/assets/models/ingredients.model';
import { RecipesModel } from 'src/assets/models/recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
 private recipes: RecipesModel[]= [ new RecipesModel("Pirão", "Feito da Cabeça do Peixe e Farinha de mandioca", "https://cdn.ocp.news/2020/01/pirao-de-peixe.jpg", [new IngredientsModel("coentro", 5)]),
 new RecipesModel("Feijoada", "Feito com Feijão Preto e Parte de carne de Porco e Boi", "https://redesuldenoticias.com.br/content/uploads/2018/05/feijoada-receita.jpg", [new IngredientsModel("Pé de Porco", 2)]),
 new RecipesModel("Moqueca Capixaba", "Feito com um bom peixe e mais  camarão como optional", "https://www.hgnoticias.com.br/wp-content/uploads/2015/07/moqueca-capixaba.jpg",[new IngredientsModel("Camarão", 2)]), ]


 recipeSelected = new EventEmitter<RecipesModel>(); /**Emite o evento na recipe-item  */
  constructor() { }

  getRecipes():Observable<RecipesModel[]> {
    /**Retornando o SLICE(), sempre retorno uma NOVA copia da memoria e não o array original */
    return of (this.recipes.slice());
  }
}
