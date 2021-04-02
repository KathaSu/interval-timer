export interface LoginEmail {
    email: string;
}

export interface LoginData extends LoginEmail {
    password: string;
}