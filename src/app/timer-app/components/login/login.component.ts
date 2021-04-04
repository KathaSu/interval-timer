import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewType } from './login.enum';
import { SignUpData } from './login.interface';
import { BaseApiService } from '../../../shared/services/base-api/base-api.service';
import { ApiUrls } from '../../../shared/services/base-api/base-api.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseApiService implements OnInit, OnDestroy {  
  reqUrls = ApiUrls;

  view = ViewType.Login;
  viewType = ViewType;  
  showPw = false;
  submitted: boolean;

  form: FormGroup = new FormGroup({
    email: new FormControl('', LoginComponent.EMAIL_VALIDATOR),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    terms_conditions: new FormControl(''),
  });

  private static readonly EMAIL_VALIDATOR = [  	
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  ]; 

  private static readonly PASSWORD_VALIDATOR = [
    Validators.required,
    // TODO: Correct regex for password
    // Minimum eight characters, at least one letter, one number and one special character
    // Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"),
  ]
  
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    protected http: HttpClient,
  ) { 
    super(http);
  }

  ngOnInit(): void {
    this.formWatcher();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Change form and add/remove validators 
   * @param type for setting validator to specific field 
   */
  changeForm(type: number): void {
    this.view = type;
    this.form.reset();
    this.form.clearValidators();

    if (type === ViewType.Login || type === ViewType.SignUp) {
      this.form.get('password').setValidators(LoginComponent.PASSWORD_VALIDATOR);
    }

    if (type === ViewType.SignUp) {
      this.form.get('password_confirm').setValidators([Validators.required]);
      this.form.get('terms_conditions').setValidators([Validators.required]);
    }
    
    this.form.updateValueAndValidity();
  }

  /**
   * Checks which method should be called for each form
   */
  submitForm(): void {
    switch (this.view) {
      case ViewType.SignUp:
        this.signUp();
        break;
      case ViewType.ForgotPw: 
        this.forgotPw();
        break;
      default:
        this.emailLogin();
    }
  }

  /**
   * Reset submit after view change
   */
  resetSubmitted(): void {
    this.submitted = false;
  }
    
  /**
   * Login via Google
   */
  googleLogin(): void {
    console.log('google login');
  }

  /**
   * Login via email
   */
  private emailLogin(): void {
    console.log('MUH', this.form);
    this.submitted = true;
    if (this.form.valid) {
      // TODO: Adjust request response and error handling
      this.stub = this.reqUrls.Login;
      this.post(this.form.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => { 
            this.router.navigateByUrl('/timer-list');
            this.form.reset(); 
          },
          () => this.router.navigateByUrl('/timer-list'),
        )
    }
  }

  /**
   * Password forgotten - get password reset link
   */
  private forgotPw(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log('forgotPw', this.form.valid, this.form.getRawValue());
      // TODO: Adjust request
      this.stub = this.reqUrls.Login;
      this.post(this.form.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => this.form.reset(),
          () => null,
        )
    }
  }

  /**
   * Sign up new user 
   * @returns If form is invalid or password don't match validator or both passwords don't match
   */
  private signUp(): void {
    this.submitted = true;

    // Return if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Set error if passwords don't match
    const rawForm: SignUpData = this.form.getRawValue();
    if (rawForm.password !== rawForm.password_confirm) {
      this.setPwErrors(true);
      return;
    }

    // TODO: Adjust request 
    this.stub = this.reqUrls.SignUp;
    this.put(rawForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.form.reset(),
        () => null,
      )
  }

  /**
   * Observe form changes
   */
  private formWatcher(): void {
    this.form.valueChanges.subscribe(() => {
      // Sets submitted to false to hide input error styling until user submits form again
      this.submitted = false;

      // Reset errors for password confirm in sign up form
      if (this.view === this.viewType.SignUp) {
        this.setPwErrors(null);
      }
    });
  }

  /**
   * Set form passwords errors
   * @param value: true to set errors and null to reset errors 
   */
  private setPwErrors(value: true | null): void {
    this.form.get('password').setErrors({'incorrect': value});
    this.form.get('password_confirm').setErrors({'incorrect': value});
  }
}
