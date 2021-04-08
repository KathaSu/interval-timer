import { Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ViewType } from './login.enum';
import { SignUpData } from './login.interface';
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from '@shared/utils/form-validation.utils';
import { QueryParams } from '@shared/services/base-api/base-api.interface';
import { BaseApiService } from '@shared/services/base-api/base-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseApiService implements OnInit, OnDestroy {  
  view = ViewType.Login;
  viewType = ViewType;  
  showPw = false;
  submitted: boolean;

  // Validators are set in the method setFormValidators
  form: FormGroup = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATOR),
    password: new FormControl(''),
    password_confirm: new FormControl(''),
    terms_conditions: new FormControl(''),
  });

  private destroy$ = new Subject();

  constructor(
    protected http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private meta: Meta,
  ) { 
    super(http);

    window['onSignIn'] = user => this.ngZone.run(
      () => {
        this.googleSignUp(user);      
      }
    )
  }

  ngOnInit(): void {
    this.addGoogleMetaTagAndScript();

    this.formValueWatcher();
    this.setFormValidators(this.view);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Reset form and change form for other 'view' 
   * @param type of form
   */
  changeForm(type: number): void {
    this.view = type;
    this.form.reset();
    this.form.clearValidators();

    this.setFormValidators(type);
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
   * Login with email
   */
  private emailLogin(): void {
    console.log('login', this.form);
    this.submitted = true;

    if (this.form.valid) {
      // TODO: Adjust request response and error handling
      this.stub = BaseApiService.URLS.Login;
      this.postBody(this.form.getRawValue())
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
   * Sign in with google
   */
  private googleSignUp(googleUser): void {
    // TODO: Different endpoint?
    this.stub = BaseApiService.URLS.Login;
    const params: QueryParams = {
      [BaseApiService.QUERY.LoginToken]: googleUser.getAuthResponse().id_token,
    };

    this.postQuery(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => this.router.navigateByUrl('/timer-list'),
      (err) => {
        // TODO: Backend checks if google user has account, if not route to sign up
        if (err === 404) {
          this.view = ViewType.SignUp;
        }
      },
    )
  }

  /**
   * Add Google meta tag and script
   */
  private addGoogleMetaTagAndScript(): void {
    this.meta.addTags([
      {name: 'google-signin-client_id', content: '165677235594-6d8h0lv9n1535ec7ja9tsbr1tioproti.apps.googleusercontent.com'}
    ]);

    let script = this.renderer.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.defer = true;
    script.async = true; 
    this.renderer.appendChild(document.body, script);
  }

  /**
   * Password forgotten - get password reset link
   */
  private forgotPw(): void {
    this.submitted = true;
    console.log('forgotPw', this.form.valid, this.form.getRawValue());

    if (this.form.valid) {
      // TODO: Adjust request
      this.stub = BaseApiService.URLS.Login;
      this.postBody(this.form.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.form.reset();
            this.submitted = false;
          },
          () => null,
        )
    }
  }

  /**
   * Sign up new user 
   * @returns If form is invalid or password don't match validator or both passwords don't match
   */
  private signUp(): void {
    console.log('sign up', this.form);
  
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
    this.stub = BaseApiService.URLS.SignUp;
    this.putBody(rawForm)
      .pipe(
        takeUntil(this.destroy$), 
      )
      .subscribe(
        () => {
          this.form.reset(); 
          this.submitted = false;
        },
        () => null,
      )
  }

  /**
   * Change form and add/remove validators 
   * @param type for setting validator to specific field 
   */
  private setFormValidators(type: number): void {
    if (type === ViewType.Login || type === ViewType.SignUp) {
      this.form.get('password').setValidators(PASSWORD_VALIDATOR);
    }

    if (type === ViewType.SignUp) {
      this.form.get('password_confirm').setValidators([Validators.required]);
      this.form.get('terms_conditions').setValidators([Validators.required]);
    }
    
    this.form.updateValueAndValidity();
  }
  

  /**
   * Observe form changes
   */
  private formValueWatcher(): void {
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
    this.form.get('password').setErrors(value ? {'incorrect': value} : null);
    this.form.get('password_confirm').setErrors(value ? {'incorrect': value} : null);
  }
}
