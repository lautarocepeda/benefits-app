import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImageSnippet } from 'src/app/models/image-snippet';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { BackendApiService } from 'src/app/service/backend-api.service';

@Component({
    selector: 'app-addbenefit',
    templateUrl: './addbenefit.component.html',
    styleUrls: ['./addbenefit.component.scss']
})
export class AddbenefitComponent implements OnInit {

    addBenefitForm: FormGroup;
    benefitData: any;

    // file selected with default img
    selectedFile = new ImageSnippet('assets/admin/default-benefit.jpg', null);

    constructor(private pf: FormBuilder, private BackendApi: BackendApiService, private ImageService: ImageUploadService) { }


    onSubmit() {
        this.benefitData = this.saveBenefit();

        this.BackendApi.createBenefit(this.benefitData).subscribe(
            (res) => {
                this.onSuccess();
                console.log(res);

            },
            (err) => {
                this.onError();
                console.error(err);
            }
        );


    }


    saveBenefit() {
        const saveBenefit = {
            title: this.addBenefitForm.get('title').value,
            baseImg: this.selectedFile.src,
            description: this.addBenefitForm.get('description').value,
            price: this.addBenefitForm.get('price').value,
            expiration: this.addBenefitForm.get('expiration').value
        };

        return saveBenefit;
    }


    ngOnInit() {
        this.addBenefitForm = this.pf.group({
            title: '',
            baseImg: '',
            description: '',
            price: '0',
            expiration: '',
        });
    }


    processFile(imgInput) {
        if (imgInput.files[0]) {
            const file: File = imgInput.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.addEventListener('load', (event: any) => {
                this.selectedFile = new ImageSnippet(event.target.result, file);
                this.selectedFile.pending = true;
            });
        }
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
