import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IModal } from '../models/IModal';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modal: IModal = {message:'', kind:'',statusText:''};// Angular15 Todas as var tem q ser inicializadas ja criação.
    /**Podemo emitir um evento void, para somente fechar um botão, com isto não precisa ter propriedade quando for passado
   * pois será passado somente um SINAL de evento no DOM. Muito boa esta abordagem, fv olhe no component authComponent.html
   */
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  changeBackGroudColor: string = '';


  constructor() {
    this.changeModal();
  }



  closeModal() {
    this.close.emit();
  }

  /**
   *
   * @param localModal need to passa color of the backgroud
   */
  changeModal() {
    const color = this.modal.kind;
    switch (color) {
      case 'error':
        this.changeBackGroudColor = 'linear-gradient(68.15deg, #ec8d81 14.62%, #eb0738 85.61%);';
        break;
      case 'sucess':
        this.changeBackGroudColor = `linear-gradient(68.15deg, #81a5ec 14.62%, #436892 85.61%)`;
        break;

      default:

        break;
    }

  }

}
