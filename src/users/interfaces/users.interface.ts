import { Exclude } from 'class-transformer';
import { Role } from "../../enums/role.enum";


export class Users {
    id?: string;
    name: string;
    email: string;
    mobileNumber: string;
    role?: string;
    password: string;    
}