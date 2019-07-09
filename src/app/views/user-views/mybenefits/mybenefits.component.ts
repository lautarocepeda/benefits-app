import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { Benefit } from 'src/app/models/benefit';
import { PagerService } from 'src/app/service/pager.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-mybenefits',
    templateUrl: './mybenefits.component.html',
    styleUrls: ['./mybenefits.component.scss']
})
export class MybenefitsComponent implements OnInit {

    coupons = [];
    benefits: Benefit[];


    pager: any = {};
    pagedItems: any;


    constructor(private BackendApi: BackendApiService, private pagerService: PagerService, private _sanitizer: DomSanitizer) { }


    getMyCoupons() {
        this.BackendApi.getMyCoupons()
            .subscribe(
                (res: any) => {
                    this.coupons = res;
                    // initialize to page 1
                    this.setPage(1);
                })
    }


    getBenefits() {
        this.BackendApi.getBenefits()
            .subscribe(
                (data: Benefit[]) => {
                    this.benefits = data;
                },
                (err) => {
                    console.error(err);
                }
            )
    }


    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.coupons.length, page);

        // get current page of items
        this.pagedItems = this.coupons.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    findBenefit(id: number) {
        return this.benefits.find(benefit => benefit.id == id);
    }


    ngOnInit() {
        this.getMyCoupons();
        this.getBenefits();
    }

}
