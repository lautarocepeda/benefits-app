import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterValidator } from './register.validator';
import { Register } from '../../models/Register';
import { Login } from '../../models/Login';
import { BackendApiService } from '../../service/backend-api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    registerForm: FormGroup;
    passwordForm: FormGroup;


    userToRegister: Register;

    constructor(private rf: FormBuilder, private router: Router, private apiService: BackendApiService, private AuthService: AuthenticationService) {
        const currentUser = this.AuthService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['']);
        }
    }


    ngOnInit() {
        this.validateForms();
    }


    //Validate register form and password form
    validateForms() {
        this.passwordForm = this.rf.group({
            registerFormPassword: ['', [Validators.required, Validators.minLength(8)]],
            registerFormConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        }, {
                validator: RegisterValidator.validate.bind(this)
            });

        this.registerForm = this.rf.group({
            registerFormName: ['', Validators.required],
            registerFormEmail: ['', [Validators.required, Validators.email]],
            passwordForm: this.passwordForm,
        });
    }


    onSubmit() {
        this.userToRegister = this.saveRegisterForm();
        this.registerUser(this.userToRegister);
    }


    saveRegisterForm() {
        const user = new Register(
            this.registerForm.get('registerFormName').value,
            this.registerForm.get('registerFormEmail').value,
            this.passwordForm.get('registerFormPassword').value,
            this.passwordForm.get("registerFormConfirmPassword").value,
        );

        return user;
    }


    //Log In User Created
    loginUserCreated(userCreated: Login) {
        this.AuthService.signin(userCreated).subscribe(res => {
            this.router.navigate(['']);
            return res;
        });
    }


    //Sign Up User
    registerUser(data: Register) {
        this.apiService.signup(data).subscribe((response: any) => {

            if (response.user_created) {
                alert('User created');

                //loggin of user created.
                this.loginUserCreated(data);

            } else if (response.status === '23000') {

                //show error
                this.registerForm.controls.registerFormEmail.setErrors({
                    'emailInUsed': 'El correo electrónico ingresado ya se encuentra registrado.'
                });

                //reset passwords form
                this.passwordForm.reset();
            }

        });
    }

}
