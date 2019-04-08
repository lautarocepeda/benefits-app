import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { User } from 'src/app/interfaces/User';


class ImageSnippet {
    constructor(public src: string, public file: File) {}
}


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


    selectedFile: ImageSnippet;

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


    processFile(imgInput: any) {
        const file: File = imgInput.files[0];
        const reader = new FileReader();


        console.log(file);


        reader.addEventListener('load', (event:any) => {

            this.selectedFile = new ImageSnippet(event.target.result, file);

            this.BackendApi.uploadImage(this.selectedFile.file).subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {

                }
            )


        });

        reader.readAsDataURL(file);

    } 

    //Submit upload form
    onSubmit() {

    }

    ngOnInit() {
    }

}
