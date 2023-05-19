import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/_share/services/data-storage.service';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',

})
export class HeaderButtonsComponent implements OnInit {
  subsc!: Subscription;
  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }


  saveRecipes(){
   this.dataStorage.saveRecipes()
  }

  fetchRecipes() {
    /**Aqui esta sendo feito a subscrição vazia, pois os dados são passado lá no Service, dentro TAP() */
   this.dataStorage.fetchRecipesWithAuthAndInterceptor().subscribe();
  }



}
