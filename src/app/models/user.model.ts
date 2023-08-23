import { Role } from "./role.enum";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: Role;
    token?: string;
}