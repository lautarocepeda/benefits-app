import { SafeResourceUrl } from '@angular/platform-browser';

export interface User {
    id: number;
    name: string;
    email: string;
    birthday: number;
    urlImg: SafeResourceUrl;
}