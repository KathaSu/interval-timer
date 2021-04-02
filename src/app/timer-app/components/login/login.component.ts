import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ViewType } from './login.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {  
  view = ViewType.Default;
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
      // Minimum eight characters, at least one letter, one number and one special character
      Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"),
    ]),
  });

  forgotPwForm: FormGroup = new FormGroup({
    email: new FormControl('', [  	
      Validators.required,
      Validators.pattern(LoginComponent.EMAIL_VALIDATOR),
    ]),
  });

  private static readonly EMAIL_VALIDATOR = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'; 
  private destroy$ = new Subject();

  constructor() { 
  }

  ngOnInit(): void {
    // Observe form changes and then sets submitted to false
    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
    this.forgotPwForm.valueChanges.subscribe(() => {
      this.submitted = false;
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Login via email
   */
  emailLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('login', this.loginForm.valid, this.loginForm.getRawValue());
      // TODO: Request 
      // this.http.post(this.loginForm.getRawValue())
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(
      //     () => this.loginForm.reset(),
      //     () => null,
      //   )
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
      // TODO: Request
      // this.http.post(this.forgotPwForm.getRawValue())
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(
      //     () => this.forgotPwForm.reset(),
      //     () => null,
      //   )
    }
  }

  /**
   * Reset submit after view change
   */
  resetSubmitted(): void {
    this.submitted = false;
  }
}
