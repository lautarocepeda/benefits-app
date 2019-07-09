import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { Benefit } from 'src/app/models/benefit';

@Component({
    selector: 'app-modal-verify',
    templateUrl: './modal-verify.component.html',
    styleUrls: ['./modal-verify.component.scss']
})

export class ModalVerifyComponent implements OnInit {

    heading: string;
    content: any;
    error: boolean = false;
    benefitId: number;


    constructor(public modalRef: MDBModalRef, private apiService: BackendApiService) {}


    ngOnInit() {
    }

}
