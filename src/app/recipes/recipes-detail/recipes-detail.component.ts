import { RecipesModel } from './../../../assets/models/recipes.model';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: [ './recipes-detail.Component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input("loadItemInReceipeCompoment") loadItem!: RecipesModel;
  constructor() { }

  ngOnInit(): void {
    console.log("In RecipesDetailCompoment: ", this.loadItem);
  }






}
