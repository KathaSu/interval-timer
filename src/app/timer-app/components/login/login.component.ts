import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiUrl, ViewType } from './login.enum';
import { SignUpData } from './login.interface';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseApiService implements OnInit, OnDestroy {  
  stub = 'login/';
  stubType = ApiUrl;

  view = ViewType.Login;
  viewType = ViewType;  
  showPw = false;
  submitted: boolean;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [  	
      Validators.required,
      Validators.pattern(LoginComponent.EMAIL_VALIDATOR),
    ]),
    password: new FormControl('', [
      Validators.required,
      // TODO: Correct regex for password
      // Minimum eight characters, at least one letter and one number:
      // Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"),
    ]),
  });

  forgotPwForm: FormGroup = new FormGroup({
    email: new FormControl('', [  	
      Validators.required,
      Validators.pattern(LoginComponent.EMAIL_VALIDATOR),
    ]),
  });

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [  	
      Validators.required,
      Validators.pattern(LoginComponent.EMAIL_VALIDATOR),
    ]),
    password: new FormControl('', [
      Validators.required,
      // TODO: Correct regex for password
      // Minimum eight characters, at least one letter, one number and one special character
      // Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"),
    ]),
    password_confirm: new FormControl('', [
      Validators.required,
    ]),
    terms_conditions: new FormControl('', [
      Validators.required, 
    ])
  });

  private static readonly EMAIL_VALIDATOR = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'; 
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    protected http: HttpClient,
  ) { 
    super(http);
  }

  ngOnInit(): void {
    // Observe form changes and then sets submitted to false
    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
    this.forgotPwForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
    this.signUpForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.setPwErrors(null);
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Login via email
   */
  emailLogin(): void {
    console.log('MUH', this.loginForm);
    this.submitted = true;
    if (this.loginForm.valid) {
      // TODO: Adjust request response and error handling
      this.post(this.loginForm.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { 
            this.router.navigateByUrl('/timer-list');
            this.loginForm.reset(); 
          },
          () => this.router.navigateByUrl('/timer-list'),
        )
    }
  }

  /**
   * Login via Google
   */
  googleLogin(): void {
    console.log('google login');
  }

  /**
   * Password forgotten - get password reset link
   */
  forgotPw(): void {
    this.submitted = true;
    if (this.forgotPwForm.valid) {
      console.log('forgotPw', this.forgotPwForm.valid, this.forgotPwForm.getRawValue());
      // TODO: Adjust request
      this.post(this.forgotPwForm.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => this.forgotPwForm.reset(),
          () => null,
        )
    }
  }

  /**
   * Sign up new user 
   * @returns If form is invalid or password don't match validator or both passwords don't match
   */
     signUp(): void {
      this.submitted = true;
  
      // Return if form is invalid
      if (this.signUpForm.invalid) {
        return;
      }
  
      // Set error if passwords don't match
      const rawForm: SignUpData = this.signUpForm.getRawValue();
      if (rawForm.password !== rawForm.password_confirm) {
        this.setPwErrors(true);
        return;
      }
  
      // TODO: Adjust request 
      this.put(rawForm)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => this.signUpForm.reset(),
          () => null,
        )
    }

    /**
     * Reset submit after view change
     */
    resetSubmitted(): void {
      this.submitted = false;
    }
  
    /**
     * Set form passwords errors
     * @param value: true to set errors and null to reset errors 
     */
    private setPwErrors(value: true | null): void {
      this.signUpForm.get('password').setErrors({'incorrect': value});
      this.signUpForm.get('password_confirm').setErrors({'incorrect': value});
    }
}
