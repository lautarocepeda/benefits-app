import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addbenefit',
  templateUrl: './addbenefit.component.html',
  styleUrls: ['./addbenefit.component.scss']
})
export class AddbenefitComponent implements OnInit {

  addBenefitForm: FormGroup;
  benefitData: any;

  /*
    Subir imagen y agregarla a la previsualizacion, agregar title y price a la base de datos de BENEFIT, validar formulario.


    Crear la parte del backend
  */


  constructor(private pf: FormBuilder) { }



  onSubmit() {
    this.benefitData = this.saveBenefit();
  }


  saveBenefit() {
    const saveBenefit = {
      title: this.addBenefitForm.get('title').value,
      img: '',
      description: this.addBenefitForm.get('description').value,
      price: this.addBenefitForm.get('price').value,
      expiration: this.addBenefitForm.get('expiration').value
    };

    return saveBenefit;
  }



  ngOnInit() {

    this.addBenefitForm = this.pf.group({
      title: '',
      img: '',
      description: '',
      price: '0',
      expiration: '',
    });

  }

}
