import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModalVerifyComponent } from './modal-verify/modal-verify.component';
import { Benefit } from 'src/app/models/benefit';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-verifycode',
    templateUrl: './verifycode.component.html',
    styleUrls: ['./verifycode.component.scss']
})
export class VerifycodeComponent implements OnInit {

    formCode: FormGroup;

    scannerEnabled: boolean = false;


    constructor(private apiService: BackendApiService, private modalService: MDBModalService, private _sanitizer: DomSanitizer) { }


    qrCodeResult(resultString: string) {
        this.verify(resultString.replace(/['"]+/g, ''));
    }

    scanErrorHandler() {
        alert('Error QR Scanner');
    }



    ngOnInit() {
        this.formCode = new FormGroup({
            code: new FormControl(null, Validators.required)
        })


    }

    //verify if the code is correct
    verify(code: string) {
        this.apiService.verifyCode(code).subscribe(
            (res: any) => {

                if (!res.error) {
                    this.apiService.getBenefit(res.benefit_id).subscribe(
                        (benefit: Benefit) => {

                        this.showModal('success', {
                            title: benefit.title,
                            code: code,
                            price: benefit.price,
                            benefitImg: this._sanitizer.bypassSecurityTrustStyle('url(' + this.apiService.apiURL + '/benefits/' + benefit.imgPath +')'),
                            imgLink: this._sanitizer.bypassSecurityTrustResourceUrl(this.apiService.apiURL + '/benefits/' + benefit.imgPath)
                        })
                    })
                }

            },
            (err) => {
                this.showModal('error', {
                    title: err.error.message
                })
            }
        )
    }


    showModal(typeModal: any, data: any = null) {

        const modalOption = {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-notify ',
            containerClass: 'modal fade top',
            animated: true,
            data: {
                heading: '',
                content: { title: '', price: '', code: '', benefitImg: '', imgLink: '' },
                error: false,
            }
        }

        switch (typeModal) {
            case 'success':
                modalOption.class += 'modal-success';
                modalOption.data = {
                    heading: 'Código verificado!',
                    content: {
                        title: data.title,
                        price: data.price,
                        code: data.code,
                        benefitImg: data.benefitImg,
                        imgLink: data.imgLink
                    },
                    error: false
                };

                break;

            case 'error':
                modalOption.class += 'modal-danger';
                modalOption.data.heading = 'Ocurrió un error!';
                modalOption.data.content.title = data.title;
                modalOption.data.error = true;

                break;
        }

        this.modalService.show(ModalVerifyComponent, modalOption);
    }


    onSubmitFormCode() {
        let code = this.formCode.get('code').value;

        this.verify(code);

    }


}
