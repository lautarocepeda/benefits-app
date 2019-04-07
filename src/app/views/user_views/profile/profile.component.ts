import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { User } from 'src/app/interfaces/User';



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    protected userData: User = {
        id: null,
        name: null,
        email: null,
        birthday: null
    };

    constructor(private BackendApi: BackendApiService) {


        this.BackendApi.getProfile().subscribe((response: any) => {

            this.userData = {
                id: response.id,
                name: response.name,
                email: response.email,
                birthday: response.birthday || null
            }

        });


    }

    ngOnInit() {
    }

}
