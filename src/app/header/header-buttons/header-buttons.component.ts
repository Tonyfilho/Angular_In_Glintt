import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/_share/services/data-storage.service';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.css']
})
export class HeaderButtonsComponent implements OnInit, OnDestroy {
  subsc!: Subscription;
  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
  }


  saveRecipes(){
    this.subsc = this.dataStorage.saveRecipes()
  }


  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }
}
