import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { PagerService } from 'src/app/service/pager.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users;

    pager: any = {};
    pagedItems: any;

    headElements = ['ID', 'Nombre', 'Correo', 'Genero', 'Proveedor'];


    constructor(private BackendApi: BackendApiService, private pagerService: PagerService) { }


    getUsers() {
        this.BackendApi.getUsers().subscribe(res => {
            this.users = res;
            this.setPage(1);
        })
    }


    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.users.length, page, 10);

        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    ngOnInit() {
        this.getUsers();
    }

}
