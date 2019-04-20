import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { BackendApiService } from 'src/app/service/backend-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterValidator } from '../../register/register.validator';
import { UpdateUser } from 'src/app/interfaces/update-user';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { ImageSnippet } from 'src/app/models/image-snippet';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @ViewChild('alert') alert: ElementRef;
    @ViewChild('alertMessage') alertMessage: ElementRef;

    private modeEdit: boolean = false;


    private selectedFile: ImageSnippet;


    // Update info forms
    private editForm: FormGroup;
    private passwordForm: FormGroup;


    // information user
    protected userData: any = {
        id: null,
        name: null,
        email: null,
        birthday: null,
        urlImg: '',
    };


    constructor(private rf: FormBuilder, private renderer: Renderer2, private BackendApi: BackendApiService, private ImageService: ImageUploadService, private _sanitizer: DomSanitizer) {
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
            registerFormPassword: ['', [Validators.minLength(8)]],
            registerFormConfirmPassword: ['', [Validators.minLength(8)]],
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
            password: this.passwordForm.get('registerFormConfirmPassword').value,
        };

        this.updateProfile(userUpdate);

    };


    // show result of edit profile
    private showAlertModeEdit(element: ElementRef, type: string, content: string) {
        this.renderer.addClass(element, 'show');

        // clear classes
        this.renderer.removeClass(element, 'alert-success');
        this.renderer.removeClass(element, 'alert-danger');

        switch (type) {
            case 'error':
                this.renderer.addClass(element, 'alert-danger');
                break;

            case 'success':
                this.renderer.addClass(element, 'alert-success');
                break;

            case 'warning': this.renderer.addClass(element, 'alert-warning');
                break;
        }

        // add message to html
        this.renderer.setProperty(this.alertMessage.nativeElement, 'innerHTML', content);
    }


    private updateProfile(user: UpdateUser) {
        this.BackendApi.updateProfile(user).subscribe(
            (res) => {
                console.log(res);

                // refresh profile
                this.getProfile();
                this.modeEdit = false;

                // show alert success
                this.showAlertModeEdit(this.alert.nativeElement, 'success', 'Perfil actualizado correctamente!')
            },
            (err) => {
                console.error(err);

                if (err.error.status === '23000') {
                    this.showAlertModeEdit(this.alert.nativeElement, 'error', 'El correo electrónico ingresado ya se encuentra registrado.');
                } else {
                    this.showAlertModeEdit(this.alert.nativeElement, 'error', 'Ocurrió un error al actualizar tu perfil.');
                }
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
            };
        });
    }


    processFile(imgInput: any) {

        const file: File = imgInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {

            this.selectedFile = new ImageSnippet(event.target.result, file);
            this.selectedFile.pending = true;

            this.ImageService.upload(this.selectedFile.file, 'profile').subscribe(
                (res) => {
                    this.onSuccess();
                    console.log(res);

                    // get profile again to change profile image
                    this.getProfile();
                },
                (err) => {
                    this.onError();
                    console.error(err);
                }
            );
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
