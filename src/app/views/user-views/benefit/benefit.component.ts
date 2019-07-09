import { Component, OnInit } from '@angular/core';
import { Benefit } from 'src/app/models/benefit';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { PagerService } from 'src/app/service/pager.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ModalRedeemComponent } from './modal-redeem/modal-redeem.component';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
    selector: 'app-benefit',
    templateUrl: './benefit.component.html',
    styleUrls: ['./benefit.component.scss']
})

export class BenefitComponent implements OnInit {

    redeemModal: MDBModalRef;

    private benefits: Benefit[];

    pager: any = {};
    pagedItems: any;


    constructor(private BackendApi: BackendApiService, private pagerService: PagerService, private modalService: MDBModalService, private _sanitizer: DomSanitizer) {
    }


    ngOnInit() {
        this.getBenefits();
    }


    getBenefits() {
        this.BackendApi.getBenefits().subscribe(
            (data: Benefit[]) => {
                this.benefits = data;
                // initialize to page 1
                this.setPage(1);
            },
            (err) => {
                console.error(err);
            }
        )
    }


    redeemBenefit(benefitId: any) {

        let data = {
            'benefit_id': benefitId
        };

        this.BackendApi.redeemBenefit(data).subscribe(
            (res: any) => {
                console.log('Redeem Benefit =>', res);

                const benefit: Benefit = this.benefits.find(benefit => benefit.id == data.benefit_id);

                console.log('Find =>', benefit);

                let dataBenefit: any = {
                    title: benefit.title,
                    benefitImg: this._sanitizer.bypassSecurityTrustStyle('url(' + this.BackendApi.apiURL + '/benefits/' + benefit.imgPath +')'),
                    price: benefit.price,
                    BaseQrCode: this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.BaseQrCode),
                    code: res.code
                }

                this.redeemModalShow('success', dataBenefit);
            },
            (err: any) => {
                console.log('[Error] Redemm =>', err);
                this.redeemModalShow('error');
            }
        );
    }
    

    redeemModalShow(typeModal: any, data: any = null) {

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
                content: { title: '', price: '', BaseQrCode: '', code: '', benefitImg: '' }
            }
        }

        switch (typeModal) {
            case 'success':
                modalOption.class += 'modal-success';
                modalOption.data = {
                    heading: 'Tu cupón esta listo',
                    content: {
                        title: data.title,
                        price: data.price,
                        BaseQrCode: data.BaseQrCode,
                        code: data.code,
                        benefitImg: data.benefitImg
                    }
                };

                break;

            case 'error':
                modalOption.class += 'modal-danger';
                modalOption.data.heading = 'Ocurrió un error!';

                break;
        }

        this.redeemModal = this.modalService.show(ModalRedeemComponent, modalOption);
    }


    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.benefits.length, page);

        // get current page of items
        this.pagedItems = this.benefits.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}

