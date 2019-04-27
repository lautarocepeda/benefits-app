import { Component, OnInit } from '@angular/core';
import { Benefit } from 'src/app/models/benefit';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from 'src/app/service/pager.service';

@Component({
    selector: 'app-benefit',
    templateUrl: './benefit.component.html',
    styleUrls: ['./benefit.component.scss']
})

export class BenefitComponent implements OnInit {

    private benefits: Benefit[];
    
    pager: any = {};

    pagedItems: any;

    constructor(private BackendApi: BackendApiService, private route: ActivatedRoute, private router: Router, private pagerService: PagerService) { }


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

    
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.benefits.length, page);

        // get current page of items
        this.pagedItems = this.benefits.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } 

}
