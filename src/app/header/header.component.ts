import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../_share/services/data-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output("featureSelected") featureSelected = new EventEmitter<string>();
  subsc!: Subscription;
  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);

  }

  saveRecipes(){
    this.subsc = this.dataStorage.saveRecipes()
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

}
