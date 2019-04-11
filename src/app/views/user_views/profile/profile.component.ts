import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { User } from 'src/app/interfaces/User';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterValidator } from '../../register/register.validator';
import { ImageSnippet } from 'src/app/models/image-snippet';
import { UpdateUser } from 'src/app/interfaces/update-user';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


    @ViewChild('alert') alert: ElementRef;

    private modeEdit: boolean = false;


    // image profile to change
    private selectedFile: ImageSnippet;


    // Update info forms
    private editForm: FormGroup;
    private passwordForm: FormGroup;


    // information user
    protected userData: User = {
        id: null,
        name: null,
        email: null,
        birthday: null,
        urlImg: '',
    };


    constructor(private rf: FormBuilder, private renderer: Renderer2, private BackendApi: BackendApiService, private _sanitizer: DomSanitizer) {
        this.getProfile();
    }


    ngOnInit() {
        this.validateEditForm();
    }


    private activeModeEdit(active: boolean) {
        if (active) {
            this.loadFormEdit()
            this.modeEdit = true;
        } else {
            this.modeEdit = false;
        }
    }


    private validateEditForm() {
        this.passwordForm = this.rf.group({
            registerFormPassword: ['', [Validators.required, Validators.minLength(8)]],
            registerFormConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        }, {
                validator: RegisterValidator.validate.bind(this)
            });

        this.editForm = this.rf.group({
            editFormName: ['', Validators.required],
            editFormEmail: ['', [Validators.required, Validators.email]],
            editFormBirthday: ['', [Validators.required]],
            passwordForm: this.passwordForm,
        });

    }


    private loadFormEdit() {
        this.editForm.get('editFormName').setValue(this.userData.name);
        this.editForm.get('editFormEmail').setValue(this.userData.email);
        this.editForm.get('editFormBirthday').setValue(this.userData.birthday);
    }


    private onSubmit() {
        // information user to update
        const userUpdate: UpdateUser = {
            name: this.editForm.get('editFormName').value,
            email: this.editForm.get('editFormEmail').value,
            birthday: this.editForm.get('editFormBirthday').value,
            password: '',
        };

        this.updateProfile(userUpdate);

    };


    



    
    
    // REFATORIZAR LOS ALERTS, CREAR FUNCIONES PARA MOSTRAR ALERT...
    private updateProfile(user: UpdateUser) {
        this.BackendApi.updateProfile(user).subscribe(
            (res) => {
                console.log(res);

                // refresh profile
                this.getProfile();
                this.modeEdit = false;

                // show alert success
                this.renderer.addClass(this.alert.nativeElement, 'show');
            },
            (err) => {
                console.error(err);

                if(err.error.status ===  '23000') {
                    this.renderer.setProperty(this.alert.nativeElement, 'innerHTML', 'El correo electrónico ingresado ya se encuentra registrado.');
                } else {
                    this.renderer.setProperty(this.alert.nativeElement, 'innerHTML', 'Ocurrió un error al actualizar tu perfil.');
                }

                // show alert danger to informate error
                this.renderer.addClass(this.alert.nativeElement, 'show');
                this.renderer.addClass(this.alert.nativeElement, 'alert-danger');
            });
    }


    // closed alert message when try to update profile
    private closeAlert() {
        this.renderer.removeClass(this.alert.nativeElement, 'show');
    }


    private getProfile() {
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
    private processFile(imgInput: any) {
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
                    console.error(err);
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






}
