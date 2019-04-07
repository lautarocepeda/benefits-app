export class Login {
    email: string;
    password: string;

    constructor(object: any) {
        this.email = (object.email) ? object.email : null;
        this.password = (object.password) ? object.password : null;
    }


}
