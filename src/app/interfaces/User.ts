import { SafeResourceUrl } from '@angular/platform-browser';
import { Role } from '../models/role';

export interface User {
    id: number;
    name: string;
    gender: string;
    email: string;
    birthday: number;
    urlImg: SafeResourceUrl;
    role: Role;
    token: string;
}