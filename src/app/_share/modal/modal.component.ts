import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IModal } from '../models/IModal';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modal: IModal = { message: '', kind: '', statusText: '' };// Angular15 Todas as var tem q ser inicializadas ja criação.
  /**Podemo emitir um evento void, para somente fechar um botão, com isto não precisa ter propriedade quando for passado
 * pois será passado somente um SINAL de evento no DOM. Muito boa esta abordagem, fv olhe no component authComponent.html
 */
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  changeBackGroudColor: string | undefined = ``;


  constructor() {

  }



  closeModal() {
    this.close.emit();
  }

  /**
   *
   * @param localModal need to passa color of the backgroud
   */
  changeModal() {

   /**
    * Foi usado um ternario no html
    */

  }

}
