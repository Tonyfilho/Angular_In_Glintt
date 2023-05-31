import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnersComponent } from './spinners/spinners.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    SpinnersComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [SpinnersComponent, ModalComponent]
})
export class ShareModule { }
