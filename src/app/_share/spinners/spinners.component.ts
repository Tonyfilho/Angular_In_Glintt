import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  template: '<div class="lds-hourglass"></div>',
  styleUrls: ['./spinners.component.css']
})
export class SpinnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
