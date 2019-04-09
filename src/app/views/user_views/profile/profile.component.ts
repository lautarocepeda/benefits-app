import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { User } from 'src/app/interfaces/User';
import { DomSanitizer } from '@angular/platform-browser';



class ImageSnippet {

    pending: boolean = false;
    status: string = null;


    constructor(public src: string, public file: File) { }
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
        birthday: null,
        urlImg: '',
    };


    /* GUARDAR LA FOTO QUE SUBO EN LA BASE DE DATOS DEL USUARIO RESPECTIVO Y AL HACER GETPERFIL CARGALA EN userData 
    
        ALTERNATIVA -> CREAR UNA FUNCION QUE RETORNE LA BASE64 DEL IMGPROFILE EN EL SERVIDOR Y CARGARLA DIRETAMENTE EN userData y ELIMINAR
        EL CAMPO profileImg de la base de datos. EL server tendria la profileImg y hara su base64.
    */

    constructor(private BackendApi: BackendApiService, private _sanitizer: DomSanitizer) {
        this.getProfile();
    }


    private getProfile(){
        this.BackendApi.getProfile().subscribe((response: any) => {
            this.userData = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                birthday: response.user.birthday,
                urlImg: this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
                    + response.baseImg) || '/assets/profileImg_default.jpg'
            }
        });
    }


    //Upload file to API
    processFile(imgInput: any) {
        const file: File = imgInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {

            this.selectedFile = new ImageSnippet(event.target.result, file);

            this.selectedFile.pending = true;
            this.BackendApi.uploadImage(this.selectedFile.file).subscribe(
                (res) => {
                    this.onSuccess();
                    console.log(res);

                    // get profile to update img
                    this.getProfile();
                },
                (err) => {
                    this.onError();
                    console.log(err);
                }
            )
        });

        reader.readAsDataURL(file);
    }


    private onSuccess() {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'ok';
    }


    private onError() {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'fail';
        this.selectedFile.src = '';
    }




    ngOnInit() {
    }

}
