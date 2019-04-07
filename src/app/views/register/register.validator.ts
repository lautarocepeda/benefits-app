import { FormGroup } from '@angular/forms';


export class RegisterValidator {


    static validate(registrationFormGroup: FormGroup) {

        const password = registrationFormGroup.controls.registerFormPassword.value || '';
        const repeatPassword = registrationFormGroup.controls.registerFormConfirmPassword.value || '';
 
        if (repeatPassword.length <= 0) return null;
        if (repeatPassword !== password) return { doesMatchPassword: true };
        
 
        return null;
    }

}