export class Register {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;


    constructor(firstName: string, email: string, password: string, confirmPassword: string) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

}