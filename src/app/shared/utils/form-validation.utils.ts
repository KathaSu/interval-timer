import { Validators } from '@angular/forms';

export const EMAIL_VALIDATOR = [  	
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
]; 

export const PASSWORD_VALIDATOR = [
    Validators.required,
    // TODO: Validators.pattern for password
];
