import { RecipesModel } from './../../../assets/models/recipes.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: [ './recipes-list.Component.css']

})
export class RecipesListComponent implements OnInit {
  recipes: RecipesModel[]= [ new RecipesModel("Pirão", "Feito da Cabeça do Peixe e Farinha de mandioca", "https://cdn.ocp.news/2020/01/pirao-de-peixe.jpg"),
  new RecipesModel("Feijoada", "Feito com Feijão Preto e Parte de carne de Porco e Boi", "https://redesuldenoticias.com.br/content/uploads/2018/05/feijoada-receita.jpg"),
  new RecipesModel("Moqueca Capixaba", "Feito com um bom peixe e mais  camarão como optional", "https://www.hgnoticias.com.br/wp-content/uploads/2015/07/moqueca-capixaba.jpg"),



];
  constructor() { }

  ngOnInit(): void {
  }

}
