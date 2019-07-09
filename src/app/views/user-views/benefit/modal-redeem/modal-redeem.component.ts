import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-redeem',
  templateUrl: './modal-redeem.component.html',
  styleUrls: ['./modal-redeem.component.scss']
})
export class ModalRedeemComponent {

  heading: string;
  content: any;

  constructor(public modalRef: MDBModalRef) { }

}
