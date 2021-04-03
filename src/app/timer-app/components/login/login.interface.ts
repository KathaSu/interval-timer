export interface LoginEmail {
    email: string;
}

export interface LoginData extends LoginEmail {
    password: string;
}

export interface SignUpData {
    email: string;
    password: string;
    password_confirm?: string;
}