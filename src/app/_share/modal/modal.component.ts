import { Component, Input } from '@angular/core';
import { IModal } from '../models/IModal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
 @Input() modal!: IModal;

}
